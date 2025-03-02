'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  name: string;
  overview: string;
};

const FALLBACK_IMAGE = '/fallback.jpg';

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [allTrending, setAllTrending] = useState<Movie[]>([]);
  const [bestOfTheWeek, setBestOfTheWeek] = useState<Movie | null>(null);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  const [loadingPopular, setLoadingPopular] = useState(false);
  const [loadingTrending, setLoadingTrending] = useState(false);
  const [loadingNowPlaying, setLoadingNowPlaying] = useState(false);
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);

  const hasFetchedPopular = useRef(false);
  const hasFetchedTrending = useRef(false);
  const hasFetchedNowPlaying = useRef(false);
  const hasFetchedUpcoming = useRef(false);

  const popular_api = useMemo(() => '/api/movies/popular', []);
  const all_trending_api = useMemo(() => '/api/movies/trending/all', []);
  const now_playing_api = useMemo(() => '/api/movies/now-playing', []);
  const upcoming_api = useMemo(() => '/api/movies/upcoming', []);

  const fetchPopularMovies = useCallback(async () => {
    if (hasFetchedPopular.current) {
      return;
    }
    hasFetchedPopular.current = true;

    try {
      setLoadingPopular(true);
      const { data } = await axios.get(popular_api);
      console.log('data movies popular', data);
      setPopularMovies(data.results);
    } catch (error) {
      console.error('Error while fetching popular movies:', error);
    } finally {
      setLoadingPopular(false);
    }
  }, [popular_api]);

  const fetchAllTrending = useCallback(async () => {
    if (hasFetchedTrending.current) {
      return;
    }
    hasFetchedTrending.current = true;

    try {
      setLoadingTrending(true);
      const { data } = await axios.get(all_trending_api);
      console.log('all trending data', data);
      setAllTrending(data.results);
    } catch (error) {
      console.error('Error while fetching all trending movies:', error);
    } finally {
      setLoadingTrending(false);
    }
  }, [all_trending_api]);

  const fetchNowPlaying = useCallback(async () => {
    if (hasFetchedNowPlaying.current) {
      return;
    }
    hasFetchedNowPlaying.current = true;

    try {
      setLoadingNowPlaying(true);
      const { data } = await axios.get(now_playing_api);
      console.log('now playing', data);
      setNowPlaying(data.results);
    } catch (error) {
      console.error('Error while fetching now playing:', error);
    } finally {
      setLoadingNowPlaying(false);
    }
  }, [now_playing_api]);

  const fetchUpcoming = useCallback(async () => {
    if (hasFetchedUpcoming.current) {
      return;
    }
    hasFetchedUpcoming.current = true;

    try {
      setLoadingUpcoming(true);
      const { data } = await axios.get(upcoming_api);
      console.log('upcoming shows', data);
      setUpcoming(data.results);
    } catch (error) {
      console.error('Error while fetching upcoming shows:', error);
    } finally {
      setLoadingUpcoming(false);
    }
  }, []);

  useEffect(() => {
    fetchPopularMovies();
    fetchAllTrending();
    fetchNowPlaying();
    fetchUpcoming();
  }, [fetchPopularMovies, fetchAllTrending, fetchNowPlaying, fetchUpcoming]);

  useEffect(() => {
    if (typeof window !== 'undefined' && allTrending.length > 0) {
      const randomMovie =
        allTrending[Math.floor(Math.random() * allTrending.length)];
      console.log('random', randomMovie);
      setBestOfTheWeek(randomMovie);
    }
  }, [allTrending]);

  return (
    <div className="px-6 py-4">
      <div className="my-4">
        <h1 className="text-2xl font-bold">Best of The Week</h1>
        <h3 className="text-zinc-500">
          Don’t miss this one—A must-watch for your collection!
        </h3>
      </div>
      {bestOfTheWeek && (
        <div className="relative w-full h-[500px] md:h-[400px] sm:h-[300px]">
          {/* Background Image */}
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
      )}
      <div className="flex justify-between mt-10">
        <h1 className="text-2xl font-bold">Now Playing</h1>
        <Button asChild>
          <Link href="/now-playing">Show All</Link>
        </Button>
      </div>
      {loadingNowPlaying ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="flex flex-wrap justify-center md:justify-between gap-4 mt-4">
          {nowPlaying.slice(0, 6).map(movie => (
            <li key={movie.id} className="min-w-[170px] max-w-[170px]">
              <div className="w-full aspect-[2/3] relative">
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : FALLBACK_IMAGE
                  }
                  alt={movie.title}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 170px"
                  priority
                />
              </div>
              <h2 className="text-sm font-semibold mt-2 text-center truncate">
                {movie.title}
              </h2>
              <p className="text-xs text-gray-500 text-center">
                {movie.release_date}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between mt-10">
        <h1 className="text-2xl font-bold">Popular Movies Right Now</h1>
        <Button asChild>
          <Link href="/popular-movies">Show All</Link>
        </Button>
      </div>
      {loadingPopular ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="flex flex-wrap justify-center md:justify-between gap-4 mt-4">
          {popularMovies.slice(0, 6).map(movie => (
            <li key={movie.id} className="min-w-[170px] max-w-[170px]">
              <div className="w-full aspect-[2/3] relative">
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : FALLBACK_IMAGE
                  }
                  alt={movie.title}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 170px"
                  priority
                />
              </div>
              <h2 className="text-sm font-semibold mt-2 text-center truncate">
                {movie.title}
              </h2>
              <p className="text-xs text-gray-500 text-center">
                {movie.release_date}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between mt-10">
        <h1 className="text-2xl font-bold">Trending</h1>
        <Button asChild>
          <Link href="/trending">Show All</Link>
        </Button>
      </div>
      {loadingTrending ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-wrap justify-center md:justify-between gap-4 mt-4">
          {allTrending.slice(0, 6).map(movie => (
            <li key={movie.id} className="min-w-[170px] max-w-[170px]">
              <div className="w-full aspect-[2/3] relative">
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : FALLBACK_IMAGE
                  }
                  alt={'trending movie'}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 170px"
                  priority
                />
              </div>
              <h2 className="text-sm font-semibold mt-2 text-center truncate">
                {movie.title}
              </h2>
              <p className="text-xs text-gray-500 text-center">
                {movie.release_date}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between mt-10">
        <h1 className="text-2xl font-bold">Upcoming</h1>
        <Button asChild>
          <Link href="/upcoming">Show All</Link>
        </Button>
      </div>
      {loadingUpcoming ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-wrap justify-center md:justify-between gap-4 mt-4">
          {upcoming.slice(0, 6).map(movie => (
            <li key={movie.id} className="min-w-[170px] max-w-[170px]">
              <div className="w-full aspect-[2/3] relative">
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : FALLBACK_IMAGE
                  }
                  alt={'trending movie'}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 170px"
                  priority
                />
              </div>
              <h2 className="text-sm font-semibold mt-2 text-center truncate">
                {movie.title}
              </h2>
              <p className="text-xs text-gray-500 text-center">
                {movie.release_date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
