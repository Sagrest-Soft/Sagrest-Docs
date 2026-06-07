/**
 * embed.ts
 *
 * Reads ../build/llms-full.txt, splits on markdown headings (preserving
 * heading metadata), generates OpenAI embeddings, saves an HNSWLib vector
 * store to ./vector-cache/, and packs everything into ./vector-cache.zip.
 * 
 * Almost 100% generated using Claude 4.6, with some manual tweaks and formatting.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... npx tsx embed.ts
 *   OPENAI_API_KEY=sk-... npx tsx embed.ts --dry-run   (skip OpenAI calls)
 *
 * Output:
 *   ./vector-cache/index.bin      – HNSW graph
 *   ./vector-cache/docstore.json  – document text + metadata
 *   ./vector-cache/args.json      – HNSWLib constructor args
 *   ./vector-cache-metadata.json  – build info (model, date, chunk count…)
 *   ./vector-cache.zip            – all of the above, ready to host/deploy
 */

import { createHash } from 'crypto';
import { readFile, writeFile, mkdir, access, rm } from 'fs/promises';
import { createWriteStream } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { performance } from 'perf_hooks';
import archiver from 'archiver';

// ─── LangChain imports ────────────────────────────────────────────────────────
import { Document } from '@langchain/core/documents';
import type { EmbeddingsInterface } from '@langchain/core/embeddings';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { OpenAIEmbeddings } from '@langchain/openai';
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Config {
  inputFile: string;
  vectorCacheDir: string;
  outputZip: string;
  metadataPath: string;
  embeddingModel: string;
  chunkSize: number;
  chunkOverlap: number;
  embeddingBatchSize: number;
}

/** One heading-delimited section extracted from the markdown source. */
interface HeadingSection {
  content: string;
  h1?: string;
  h2?: string;
  h3?: string;
}

interface ChunkMetadata {
  source: string;
  heading: string;
  index: number;
  h1?: string;
  h2?: string;
  h3?: string;
  [key: string]: unknown;
}

interface BuildMetadata {
  documentHash: string;
  builtAt: string;
  model: string;
  chunkCount: number;
  chunkSize: number;
  chunkOverlap: number;
}

// ─── Configuration ────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes('--dry-run');
const DEBUG_CHUNKS = process.argv.includes('--debug-chunks');

const CONFIG: Config = {
  /** Path to the full documentation text file */
  inputFile: resolve(__dirname, '..', 'build', 'llms-full.txt'),

  /** Where to write the HNSWLib index files */
  vectorCacheDir: join(__dirname, 'vector-cache'),

  /** Final zip archive path */
  outputZip: join(__dirname, '..', 'static', 'vector-cache.zip'),

  /** Metadata JSON output path */
  metadataPath: join(__dirname, '..', 'static', 'vector-cache-metadata.json'),

  /** Embedding model – must stay consistent across build & load */
  embeddingModel: 'text-embedding-3-small',

  /**
   * Secondary character-level splitter applied after heading splits.
   * 800–1500 chars is recommended for doc sites (per the workflow doc).
   */
  chunkSize: 1000,
  chunkOverlap: 200,

  /**
   * OpenAI embedding API: max documents per batch request.
   * Keeping this low reduces the risk of hitting token/rate limits.
   */
  embeddingBatchSize: 100,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** 
 * Writes chunks to a debug folder for inspection. 
 * This helps verify sanitization and context prepending.
 */
async function writeDebugChunks(chunks: Document<ChunkMetadata>[]): Promise<void> {
  const debugDir = join(__dirname, 'debug-chunks');
  log('🐛', 'Debug', `Writing ${chunks.length} chunks to ${debugDir}`);
  
  try {
    await rm(debugDir, { recursive: true, force: true });
    await mkdir(debugDir, { recursive: true });
    
    for (const chunk of chunks) {
      const filename = `chunk-${String(chunk.metadata.index).padStart(3, '0')}.md`;
      const filePath = join(debugDir, filename);
      
      const debugContent = [
        `---`,
        `heading: ${chunk.metadata.heading}`,
        `title: ${chunk.metadata.title}`,
        `---`,
        ``,
        chunk.pageContent
      ].join('\n');
      
      await writeFile(filePath, debugContent);
    }
    logDetail(`Done. Inspect the files to verify chunk quality.`);
  } catch (err) {
    log('⚠️', 'Debug Error', String(err));
  }
}

/** ANSI colour helpers (no external deps) */
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  grey: '\x1b[90m',
} as const;

/**
 * Removes noise from text, including Docusaurus anchors, Markdown images,
 * and base64 encoded image data.
 */
function sanitizeHeading(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '') // Remove Markdown images
    .replace(/data:image\/[^;]+;base64,[^"'\s)]+/g, '') // Remove base64 data
    .replace(/\[​?\]\(#[^)]+\)/g, '') // Remove Docusaurus anchor noise
    .replace(/[\s\u200B]+$/, '')
    .trim();
}

function log(icon: string, label: string, msg = ''): void {
  console.log(`${c.bold}${icon}${c.reset}  ${c.cyan}${label}${c.reset}  ${msg}`);
}

function logDetail(msg: string): void {
  console.log(`   ${c.grey}${msg}${c.reset}`);
}

function elapsed(start: number): string {
  return ((performance.now() - start) / 1000).toFixed(2) + 's';
}

function fmtBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
}

/** Ensure a directory exists, creating it recursively if needed. */
async function ensureDir(dir: string): Promise<void> {
  try {
    await access(dir);
  } catch {
    await mkdir(dir, { recursive: true });
  }
}

/** Zip an entire directory into a single .zip file. Returns bytes written. */
function zipDirectory(sourceDir: string, outPath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(outPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => resolve(archive.pointer()));
    archive.on('error', reject);

    archive.pipe(output);
    archive.directory(sourceDir, 'vector-cache');
    archive.finalize();
  });
}

/**
 * Scans the markdown source line-by-line and splits it into sections at every
 * `#`, `##`, or `###` boundary.  Each section carries the heading context it
 * fell under as `h1` / `h2` / `h3` metadata fields.
 *
 * This replicates what LangChain's Python `MarkdownHeaderTextSplitter` does,
 * since the JS `@langchain/textsplitters` package does not export that class.
 */
function splitByHeadings(content: string): HeadingSection[] {
  const lines = content.split('\n');
  const sections: HeadingSection[] = [];

  let h1 = '';
  let h2 = '';
  let h3 = '';
  let buf: string[] = [];

  const flush = (): void => {
    const text = buf.join('\n').trim();
    if (!text) return;
    const section: HeadingSection = { content: text };
    if (h1) section.h1 = h1;
    if (h2) section.h2 = h2;
    if (h3) section.h3 = h3;
    sections.push(section);
    buf = [];
  };

  for (const line of lines) {
    // Match in reverse specificity so ### is checked before ## before #
    const h3m = line.match(/^### (.+)/);
    const h2m = !h3m && line.match(/^## (.+)/);
    const h1m = !h3m && !h2m && line.match(/^# (.+)/);
    // Also treat horizontal rules (---) as logical section boundaries
    const isHr = line.trim() === '---';

    if (h1m) {
      flush();
      h1 = sanitizeHeading(h1m[1]);
      h2 = '';
      h3 = '';
      buf.push(`# ${h1}`);
    } else if (h2m) {
      flush();
      h2 = sanitizeHeading(h2m[1]);
      h3 = '';
      buf.push(`## ${h2}`);
    } else if (h3m) {
      flush();
      h3 = sanitizeHeading(h3m[1]);
      buf.push(`### ${h3}`);
    } else if (isHr) {
      flush();
    } else {
      // Clean each line to remove any inline Docusaurus anchor noise
      buf.push(sanitizeHeading(line));
    }
  }

  flush(); // capture the final section
  return sections;
}

// ─── Pipeline steps ───────────────────────────────────────────────────────────

/**
 * STEP 1 – Read llms-full.txt from disk.
 */
async function readInputFile(): Promise<string> {
  const t = performance.now();
  log('📖', 'Reading', CONFIG.inputFile);

  let content: string;
  try {
    content = await readFile(CONFIG.inputFile, 'utf-8');
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`${c.red}✖  Cannot read input file: ${msg}${c.reset}`);
    console.error(`   Make sure "../build/llms-full.txt" exists relative to this script.`);
    process.exit(1);
  }

  logDetail(
    `${fmtBytes(content.length)} · ` +
    `${content.split('\n').length.toLocaleString()} lines · ` +
    `${elapsed(t)}`
  );
  return content;
}

/**
 * STEP 2 – Split on markdown headings, then apply a secondary character splitter.
 *
 * Primary pass  : custom `splitByHeadings()` groups content by # / ## / ###
 *                 boundaries and attaches heading text as h1/h2/h3 metadata.
 * Secondary pass: `RecursiveCharacterTextSplitter` keeps every chunk within
 *                 `chunkSize` characters while re-attaching the heading metadata.
 */
async function splitContent(content: string): Promise<Document<ChunkMetadata>[]> {
  const t = performance.now();
  log('✂️ ', 'Splitting', 'on markdown headings + character chunks');

  // Primary: heading-aware section split
  const sections = splitByHeadings(content);
  logDetail(`${sections.length} heading-level sections`);

  // Convert sections to Documents so the char splitter can process them
  const sectionDocs = sections.map(
    (s) => new Document({ pageContent: s.content, metadata: { h1: s.h1 ?? '', h2: s.h2 ?? '', h3: s.h3 ?? '' } })
  );

  // Secondary: enforce chunkSize, preserving metadata on every sub-chunk
  const charSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: CONFIG.chunkSize,
    chunkOverlap: CONFIG.chunkOverlap,
  });
  const rawChunks = await charSplitter.splitDocuments(sectionDocs);

  // Enrich: add source + human-readable heading breadcrumb + PREPEND to content
  const enriched: Document<ChunkMetadata>[] = rawChunks.map((doc, i) => {
    const { h1 = '', h2 = '', h3 = '' } = doc.metadata as Partial<ChunkMetadata>;
    const heading = [h1, h2, h3].filter(Boolean).join(' › ');
    
    // Crucial for quality: Prepend the full heading context to the chunk's content
    // so that OpenAI embeddings capture the semantic location of the text.
    const contextPrefix = heading ? `# ${heading}\n\n` : '';
    const pageContentWithContext = contextPrefix + doc.pageContent;

    return new Document<ChunkMetadata>({
      pageContent: pageContentWithContext,
      metadata: {
        source: 'llms-full.txt',
        title: h3 || h2 || h1 || 'Untitled', // Providing 'title' for search result UI
        heading: heading || '(no heading)',
        index: i,
        h1, h2, h3,
      },
    });
  });

  // Filter out low-value chunks (redundant headings, placeholders like "Full Documentation Content")
  const filtered = enriched.filter((doc) => {
    const content = doc.pageContent.trim();
    const heading = doc.metadata.heading;
    
    // 1. Remove the prepended breadcrumb for validation
    const breadcrumb = `# ${heading}`;
    let substantiveContent = content;
    if (content.startsWith(breadcrumb)) {
      substantiveContent = content.slice(breadcrumb.length).trim();
    }

    // 2. Ignore if it's just a repetition of the heading (e.g. "# Heading\n\n# Heading")
    // or if it contains only placeholders like "## docs" or "Full Documentation Content"
    const isPlaceholder = /^(#+ )?(docs|Full Documentation Content)$/i.test(substantiveContent);
    const isRedundantHeading = substantiveContent.replace(/^#+ /, '').trim() === heading;
    
    // Only keep if it has actual content and isn't just a placeholder/redundant
    return substantiveContent.length > 0 && !isPlaceholder && !isRedundantHeading;
  });

  // Re-index after filtering
  filtered.forEach((doc, i) => {
    doc.metadata.index = i;
  });

  const totalChars = filtered.reduce((sum, d) => sum + d.pageContent.length, 0);
  logDetail(
    `${filtered.length} final chunks · ` +
    `avg ${Math.round(totalChars / filtered.length)} chars/chunk · ` +
    `${elapsed(t)}`
  );

  return filtered;
}

/**
 * STEP 3 + 4 – Generate embeddings and build the HNSWLib vector store.
 *
 * In dry-run mode this builds a minimal store with random vectors so the
 * save/zip steps can be exercised without spending API credits.
 */
async function buildVectorStore(
  chunks: Document<ChunkMetadata>[]
): Promise<HNSWLib> {
  const t = performance.now();

  if (DRY_RUN) {
    log('🚧', 'DRY RUN', 'skipping OpenAI API – using a stub store');
    logDetail('Remove --dry-run and set OPENAI_API_KEY to generate real embeddings.');

    const fakeEmbeddings: EmbeddingsInterface = {
      embedDocuments: async (texts: string[]): Promise<number[][]> =>
        texts.map(() => Array.from({ length: 1536 }, () => Math.random() - 0.5)),
      embedQuery: async (_text: string): Promise<number[]> =>
        Array.from({ length: 1536 }, () => Math.random() - 0.5),
    };

    const store = await HNSWLib.fromDocuments(chunks.slice(0, 5), fakeEmbeddings);
    logDetail(`stub store built with 5 documents · ${elapsed(t)}`);
    return store;
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error(`${c.red}✖  OPENAI_API_KEY environment variable is not set.${c.reset}`);
    console.error(`   Export it or pass it inline:`);
    console.error(`   OPENAI_API_KEY=sk-... npx tsx embed.ts`);
    process.exit(1);
  }

  log('🔢', 'Embeddings', `model: ${CONFIG.embeddingModel} · ${chunks.length} chunks`);

  const embeddings = new OpenAIEmbeddings({
    model: CONFIG.embeddingModel,
    batchSize: CONFIG.embeddingBatchSize,
  });

  log('🗄️ ', 'Building', 'HNSWLib vector store (this may take a minute)…');

  const vectorStore = await HNSWLib.fromDocuments(chunks, embeddings);
  logDetail(`vector store ready · ${elapsed(t)}`);
  return vectorStore;
}

/**
 * STEP 5 – Persist the HNSWLib index + a metadata sidecar to disk.
 */
async function saveVectorStore(
  vectorStore: HNSWLib,
  chunks: Document<ChunkMetadata>[],
  documentHash: string
): Promise<void> {
  const t = performance.now();
  log('💾', 'Saving', CONFIG.vectorCacheDir);

  await ensureDir(CONFIG.vectorCacheDir);
  await vectorStore.save(CONFIG.vectorCacheDir);

  // Write metadata json so future loaders can verify model/version compatibility
  const meta: BuildMetadata = {
    documentHash,
    builtAt: new Date().toISOString(),
    model: CONFIG.embeddingModel,
    chunkCount: chunks.length,
    chunkSize: CONFIG.chunkSize,
    chunkOverlap: CONFIG.chunkOverlap
  };

  await writeFile(
    CONFIG.metadataPath,
    JSON.stringify(meta, null, 2)
  );

  logDetail(`index.bin + docstore.json + args.json written · ${elapsed(t)}`);
}

/**
 * STEP 6 – Create vector-cache.zip containing all index files.
 */
async function createZip(): Promise<void> {
  const t = performance.now();
  log('🗜️ ', 'Zipping', CONFIG.outputZip);

  const bytes = await zipDirectory(CONFIG.vectorCacheDir, CONFIG.outputZip);
  logDetail(`${fmtBytes(bytes)} written · ${elapsed(t)}`);
}

async function checkIfDocumentChanged(newHash: string): Promise<boolean> {
  try {
    // Read old metadata JSON if it exists to read document hash
    const oldMetaContent = await readFile(CONFIG.metadataPath, 'utf-8');
    const oldMeta: BuildMetadata = JSON.parse(oldMetaContent);
    
    const hashMatches = newHash === oldMeta.documentHash;
    const modelMatches = CONFIG.embeddingModel === oldMeta.model;
    const chunkSizeMatches = CONFIG.chunkSize === oldMeta.chunkSize;
    const chunkOverlapMatches = CONFIG.chunkOverlap === oldMeta.chunkOverlap;
    
    return !(hashMatches && modelMatches && chunkSizeMatches && chunkOverlapMatches);
  } catch (err) {
    return true; // Assume changed if we can't read the file or it's missing
  }
}

// ─── Entry point ──────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const total = performance.now();

  console.log();
  console.log(`${c.bold}${c.green}▶  LangChain Embedding Pipeline${c.reset}`);
  console.log(`   Input  : ${CONFIG.inputFile}`);
  console.log(`   Output : ${CONFIG.outputZip}`);
  console.log(`   Model  : ${CONFIG.embeddingModel}`);
  if (DRY_RUN) console.log(`   ${c.yellow}Mode   : DRY RUN (no OpenAI calls)${c.reset}`);
  if (DEBUG_CHUNKS) console.log(`   ${c.cyan}Mode   : DEBUG CHUNKS (saving to debug-chunks/)${c.reset}`);
  console.log();

  const content = await readInputFile();

  // Calculate md5 hash of llms-full.txt content to include in metadata for future integrity checks
  const hash = createHash('md5');
  hash.update(content);
  const documentHash = hash.digest('hex');

  const chunks = await splitContent(content);

  if (DEBUG_CHUNKS) {
    await writeDebugChunks(chunks);
    if (!process.argv.includes('--run-anyway')) {
      console.log(`\n${c.yellow}Stopping because --debug-chunks is set.${c.reset}`);
      console.log(`Review the chunks in ./embedding/debug-chunks/, then run without the flag to proceed with embedding.`);
      console.log(`Or add ${c.bold}--run-anyway${c.reset} to do both.`);
      return;
    }
  }

  if (!await checkIfDocumentChanged(documentHash)) {
    console.log(`${c.yellow}⚠️  Document has not changed since last build. Skipping embedding generation.${c.reset}`);
    console.log(`   If you want to force a rebuild, delete the existing metadata file or modify the document.`);
    return;
  }

  const vectorStore = await buildVectorStore(chunks);
  await saveVectorStore(vectorStore, chunks, documentHash);
  await createZip();

  console.log();
  console.log(`${c.bold}${c.green}✔  Done${c.reset}  total: ${elapsed(total)}`);
  console.log();
  console.log(`   To load the index in your app:`);
  console.log(`${c.grey}   const store = await HNSWLib.load('./vector-cache', embeddings);`);
  console.log(`   const results = await store.similaritySearch('your query', 5);${c.reset}`);
  console.log();
  console.log(`   To deploy: host vector-cache.zip as a static asset, then`);
  console.log(`${c.grey}   download → unzip → HNSWLib.load(...)${c.reset}`);
  console.log();
}

main().catch((err: unknown) => {
  const msg = err instanceof Error ? err.message : String(err);
  const stack = err instanceof Error ? err.stack : '';
  console.error(`\n${c.red}✖  Fatal error: ${msg}${c.reset}`);
  if (stack) console.error(stack);
  process.exit(1);
});
