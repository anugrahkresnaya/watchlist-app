'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { RootState } from '@/store';
import useWatchlistItems from '@/hooks/useWatchlistItems';
import { FALLBACK_IMAGE } from '@/components/movie-section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Movie } from '@/types/movie';

export default function WatchlistPage() {
  const router = useRouter();
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);
  const { watchlistItems, loading, error } = useWatchlistItems();

  useEffect(() => {
    if (!sessionId) {
      router.push('/');
    }
  }, [sessionId, router]);

  if (!sessionId) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex flex-col">
                <Skeleton className="w-full aspect-[2/3] rounded-lg" />
                <Skeleton className="h-4 w-3/4 mx-auto mt-2" />
                <Skeleton className="h-3 w-1/2 mx-auto mt-1" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

      {watchlistItems.length === 0 ? (
        <Card>
          <CardContent className="py-6">
            <p className="text-center text-muted-foreground">
              You haven't added any items to your watchlist yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {watchlistItems.map((item: Movie) => (
            <Link
              key={`${item.id}-${item.media_type}`}
              href={`/${item.media_type}/${item.id}`}
              className="flex flex-col"
            >
              <div className="w-full aspect-[2/3] relative">
                <Image
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : FALLBACK_IMAGE
                  }
                  alt={item.title || item.name || 'show poster'}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                />
              </div>
              <h2 className="text-sm font-semibold mt-2 text-center truncate">
                {item.title || item.name}
              </h2>
              <p className="text-xs text-gray-500 text-center">
                {item.release_date || item.first_air_date}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
