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

export interface WatchlistItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  media_type: 'movie' | 'tv';
  overview: string;
  vote_average: string;
}

export interface WatchlistResponse {
  results: WatchlistItem[];
  total_results: number;
  total_pages: number;
  page: number;
}

export interface WatchlistSectionProps {
  watchlistItems: WatchlistItem[];
  loading: boolean;
}
