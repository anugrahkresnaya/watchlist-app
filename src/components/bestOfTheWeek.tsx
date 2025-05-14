import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { BestOfTheWeekProps } from '@/types/props';
import WatchlistButton from './WatchlistButton';

const FALLBACK_IMAGE = '/fallback.jpg';

export default function BestOfTheWeek({ allTrending }: BestOfTheWeekProps) {
  const [bestOfTheWeek, setBestOfTheWeek] = useState<Movie | null>(null);
  const [showId, setShowId] = useState<string | number>('');
  const [mediaType, setMediaType] = useState<'movie' | 'tv' | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && allTrending.length > 0) {
      const randomMovie =
        allTrending[Math.floor(Math.random() * allTrending.length)];

      // Ensure media_type is either "movie" or "tv"
      if (
        randomMovie.media_type === 'movie' ||
        randomMovie.media_type === 'tv'
      ) {
        setShowId(randomMovie.id);
        setMediaType(randomMovie.media_type);
        setBestOfTheWeek(randomMovie);
      }
    }
  }, [allTrending]);

  if (!bestOfTheWeek) {
    return null;
  }

  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold">Best of The Week</h1>
      <h3 className="text-zinc-500">
        Don’t miss this one—A must-watch for your collection!
      </h3>
      <div className="relative w-full h-[500px] md:h-[400px] sm:h-[300px]">
        <Image
          src={
            bestOfTheWeek.backdrop_path
              ? `https://image.tmdb.org/t/p/original${bestOfTheWeek.backdrop_path}`
              : FALLBACK_IMAGE
          }
          alt="best of the week show"
          fill
          className="object-cover brightness-75 rounded-lg"
          priority
        />
        {/* Overlay Content */}
        <div
          className="absolute inset-0 flex flex-col justify-center px-8 md:px-6 sm:px-4 text-white
             max-[440px]:justify-end max-[440px]:items-center max-[440px]:pb-6
             text-left max-[440px]:text-center"
        >
          <h1 className="text-4xl md:text-3xl sm:text-2xl max-w-md:text-center font-bold">
            {bestOfTheWeek.title || bestOfTheWeek.name}
          </h1>
          <p className="max-w-xl text-sm md:text-base max-[440px]:hidden mt-4">
            {bestOfTheWeek.overview}
          </p>
          <div className="w-fit mt-4">
            <WatchlistButton
              mediaId={showId}
              mediaType={mediaType as 'movie' | 'tv'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
