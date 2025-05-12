export interface useWatchlistProps {
  mediaId: string | number;
  mediaType: 'movie' | 'tv';
}

export interface WatchlistButtonProps {
  mediaId: string | number;
  mediaType: 'movie' | 'tv';
  className?: string;
  redirectPath?: string;
}
