# PeertubeVideo Component

A reusable React component for embedding Peertube videos in Docusaurus documentation.

## Usage

```tsx
import PeertubeVideo from '@site/src/components/PeertubeVideo';

<PeertubeVideo 
  videoId="your-video-id" 
  title="Your Video Title"
  fallbackVideoPath="/video/path/to/fallback.mp4"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `videoId` | `string` | *required* | The Peertube video ID (found in the video URL) |
| `title` | `string` | *required* | The title for the iframe (for accessibility) |
| `domain` | `string` | `'peertube.uno'` | The Peertube instance domain |
| `muted` | `boolean` | `true` | Whether the video should be muted by default |
| `warningTitle` | `boolean` | `false` | Whether to show warning title |
| `peertubeLink` | `boolean` | `false` | Whether to show Peertube link |
| `p2p` | `boolean` | `false` | Whether to enable P2P |
| `fallbackVideoPath` | `string` | `undefined` | Optional path to a fallback video file for download |

## Examples

### Basic usage
```tsx
<PeertubeVideo 
  videoId="socq2KRKsmA9kvzkDSmUAv" 
  title="Sagrest - Custom Interface Messages"
/>
```

### With fallback download
```tsx
<PeertubeVideo 
  videoId="socq2KRKsmA9kvzkDSmUAv" 
  title="Sagrest - Custom Interface Messages"
  fallbackVideoPath="/video/server/custom_message_bars.mp4"
/>
```

### Different Peertube instance
```tsx
<PeertubeVideo 
  videoId="your-video-id" 
  title="Your Video Title"
  domain="your-peertube-instance.com"
/>
```

## Features

- Responsive 16:9 aspect ratio
- Accessible iframe with proper title
- Customizable Peertube instance
- Optional fallback download link
- TypeScript support with full type safety
- CSS modules for styling
