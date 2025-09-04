import React from 'react';
import styles from './styles.module.css';

interface PeertubeVideoProps {
  /** The Peertube video ID */
  videoId: string;
  /** The title for the iframe */
  title: string;
  /** The Peertube instance domain (default: peertube.uno) */
  domain?: string;
  /** Whether the video should be muted by default (default: true) */
  muted?: boolean;
  /** Whether to show warning title (default: false) */
  warningTitle?: boolean;
  /** Whether to show Peertube link (default: false) */
  peertubeLink?: boolean;
  /** Whether to enable P2P (default: false) */
  p2p?: boolean;
  /** Optional fallback video file path for download */
  fallbackVideoPath?: string;
}

const PeertubeVideo: React.FC<PeertubeVideoProps> = ({
  videoId,
  title,
  domain = 'peertube.uno',
  muted = true,
  warningTitle = false,
  peertubeLink = false,
  p2p = false,
  fallbackVideoPath,
}) => {
  const embedUrl = `https://${domain}/videos/embed/${videoId}?muted=${muted ? 1 : 0}&warningTitle=${warningTitle ? 1 : 0}&peertubeLink=${peertubeLink ? 1 : 0}&p2p=${p2p ? 1 : 0}`;

  return (
    <>
      <div className={styles.videoContainer}>
        <iframe
          title={title}
          className={styles.videoIframe}
          src={embedUrl}
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
      {fallbackVideoPath && (
        <p style={{ fontSize: '0.9em', fontStyle: 'italic', marginTop: '0.5rem' }}>
          In caso di problemi con il caricamento del video, prova a{' '}
          <a href={fallbackVideoPath} download>
            scaricarlo premendo qui
          </a>
          .
        </p>
      )}
    </>
  );
};

export default PeertubeVideo;
