import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '@/store';
import { useWatchlistProps } from '@/types/watchlist';

const useWatchlist = ({ mediaId, mediaType }: useWatchlistProps) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);
  const accountId = useSelector((state: RootState) => state.auth.accountId);

  const checkWatchlistStatus = useCallback(async () => {
    if (!sessionId || !accountId || !mediaId) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(
        '/api/auth/tmdb-auth/account/watchlist',
        {
          params: {
            mediaId,
            mediaType,
            sessionId,
            accountId
          }
        }
      );

      console.log('check is ini watchlist', data);

      setIsInWatchlist(data.isInWatchlist);
    } catch (err) {
      console.error('Error checking watchlist status: ', err);
      setError('Failed to check watchlist status');
    } finally {
      setLoading(false);
    }
  }, [mediaId, mediaType, sessionId, accountId]);

  const addToWatchlist = useCallback(async () => {
    if (!sessionId || !accountId) {
      setError('Please log in to add to watchlist');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await axios.post('/api/auth/tmdb-auth/account/watchlist', {
        mediaId,
        mediaType,
        sessionId,
        accountId,
        action: 'add'
      });

      setIsInWatchlist(true);
    } catch (err) {
      console.error('Error adding to wathclist:', err);
      setError('Failed to add to watchlist');
    } finally {
      setLoading(false);
    }
  }, [mediaId, mediaType, sessionId, accountId]);

  const removeFromWatchlist = useCallback(async () => {
    if (!sessionId || !accountId) {
      setError('Please log in to remove from watchlist');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await axios.post('/api/auth/tmdb-auth/account/watchlist', {
        mediaId,
        mediaType,
        sessionId,
        accountId,
        action: 'remove'
      });

      setIsInWatchlist(false);
    } catch (err) {
      console.error('Error adding to watchlist:', err);
      setError('Failed to add to watchlist');
    } finally {
      setLoading(false);
    }
  }, [mediaId, mediaType, sessionId, accountId]);

  const toggleWatchlist = useCallback(async () => {
    if (isInWatchlist) {
      await removeFromWatchlist();
    } else {
      await addToWatchlist();
    }
  }, [isInWatchlist, addToWatchlist, removeFromWatchlist]);

  useEffect(() => {
    if (sessionId && accountId) {
      checkWatchlistStatus();
    }
  }, [sessionId, accountId, checkWatchlistStatus]);

  return {
    isInWatchlist,
    loading,
    error,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist
  };
};

export default useWatchlist;
