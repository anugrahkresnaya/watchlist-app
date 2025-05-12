export interface useWatchlistProps {
  mediaId: string | number;
  mediaType: 'movies' | 'tv';
}

export interface WatchlistButtonProps {
  mediaId: string | number;
  mediaType: 'movies' | 'tv';
  className?: string;
  redirectPath?: string;
}
