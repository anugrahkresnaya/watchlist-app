import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { BestOfTheWeekProps } from '@/types/props';

const FALLBACK_IMAGE = '/fallback.jpg';

export default function BestOfTheWeek({ allTrending }: BestOfTheWeekProps) {
  const [bestOfTheWeek, setBestOfTheWeek] = useState<Movie | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && allTrending.length > 0) {
      const randomMovie =
        allTrending[Math.floor(Math.random() * allTrending.length)];
      setBestOfTheWeek(randomMovie);
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
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-6 sm:px-4 text-white">
          <h1 className="text-4xl md:text-3xl sm:text-2xl max-w-md:text-center font-bold">
            {bestOfTheWeek.title || bestOfTheWeek.name}
          </h1>
          <p className="max-w-xl text-sm md:text-base max-[440px]:hidden mt-4">
            {bestOfTheWeek.overview}
          </p>
          <button className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white max-w-md:text-center rounded-lg text-lg md:text-base sm:text-sm w-fit">
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}
