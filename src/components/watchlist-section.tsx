import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { WatchlistSectionProps } from '@/types/watchlist';
import { FALLBACK_IMAGE } from './movie-section';

const WatchlistSection: React.FC<WatchlistSectionProps> = ({
  watchlistItems,
  loading
}) => {
  if (watchlistItems?.length === 0 && !loading) {
    return (
      <div>
        <h1 className="mt-10">My Wathclist</h1>
        <p className="text-gray-500 mt-4">
          You have'nt added any items to your watchlist yet
        </p>
      </div>
    );
  }
  return (
    <div>
      <div>
        <h1>My Watchlist</h1>
        <Button asChild>
          <Link href="/watchlist">Show All</Link>
        </Button>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul>
          {watchlistItems?.slice(0, 5).map(item => (
            <li>
              <Link href={`/${item.media_type}/${item.id}`}>
                <div>
                  <Image
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : FALLBACK_IMAGE
                    }
                    alt={item.title || item.name || 'show poster'}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 170px"
                    priority
                  />
                </div>
                <h2>{item.title || item.name}</h2>
                <p>{item.release_date || item.first_air_date}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WatchlistSection;
