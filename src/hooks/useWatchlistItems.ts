import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Movie } from '@/types/movie';
import { WatchlistItem, WatchlistResponse } from '@/types/watchlist';

const useWatchlistItems = () => {
  const [watchlistItems, setWatchlistItems] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);
  const accountId = useSelector((state: RootState) => state.auth.accountId);
  const hasFetched = useRef(false);

  const fetchWatchlistItems = useCallback(async () => {
    if (!sessionId || !accountId || hasFetched.current) {
      return;
    }

    hasFetched.current = true;

    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get<WatchlistResponse>(
        '/api/auth/tmdb-auth/account/watchlist',
        {
          params: {
            sessionId,
            accountId
          }
        }
      );

      // Convert WatchlistItem to Movie format - ensure compatibility with MovieSection component
      const movieItems = data.results.map(item => {
        const movie: Movie = {
          id: item.id,
          title: item.title || item.name || '', // Ensure title is never undefined
          poster_path: item.poster_path || '',
          release_date: item.release_date || item.first_air_date || '', // Ensure release_date is never undefined
          backdrop_path: item.backdrop_path || '',
          overview: item.overview,
          media_type: item.media_type
        };

        // Only add vote_average if it exists
        if (typeof item.vote_average === 'number') {
          movie.vote_average = item.vote_average;
        }

        return movie;
      });

      setWatchlistItems(movieItems);
    } catch (err) {
      console.error('Error fetching watchlist items:', err);
      setError('Failed to fetch watchlist items');
    } finally {
      setLoading(false);
    }
  }, [sessionId, accountId]);

  useEffect(() => {
    if (sessionId && accountId) {
      fetchWatchlistItems();
    }
  }, [sessionId, accountId, fetchWatchlistItems]);

  return { watchlistItems, loading, error };
};

export default useWatchlistItems;
