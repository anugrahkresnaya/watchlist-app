import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import useWatchlist from '@/hooks/useWatchlist';
import { RootState } from '@/store';
import { WatchlistButtonProps } from '@/types/watchlist';
import { Button } from './ui/button';

const WatchlistButton = ({
  mediaId,
  mediaType,
  className = '',
  redirectPath
}: WatchlistButtonProps) => {
  const router = useRouter();
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);
  const { isInWatchlist, loading, error, toggleWatchlist } = useWatchlist({
    mediaId,
    mediaType
  });

  const handleClick = async () => {
    if (!sessionId) {
      if (typeof window !== 'undefined' && redirectPath) {
        localStorage.setItem('loginRedirect', redirectPath);
      }

      router.push('/');
      return;
    }

    try {
      await toggleWatchlist();
      toast.success(
        isInWatchlist ? 'Removed from you watchlist' : 'Added to your watchlist'
      );
    } catch (err) {
      toast.error('Failed to update watchlist');
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      className={`${className} ${
        isInWatchlist
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-red-600 hover:bg-red-700'
      }`}
    >
      {loading
        ? 'Loading...'
        : isInWatchlist
          ? '✓ In Watchlist'
          : '+ Add to Watchlist'}
    </Button>
  );
};

export default WatchlistButton;
