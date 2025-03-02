import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Movie } from '@/types/movie';

const useMovies = (apiUrl: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);

  const fetchMovies = useCallback(async () => {
    if (hasFetched.current) {
      return;
    }
    hasFetched.current = true;

    try {
      setLoading(true);
      const { data } = await axios.get(apiUrl);
      setMovies(data.results);
    } catch (error) {
      console.error(`Error fetching movies from ${apiUrl}`, error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { movies, loading };
};

export default useMovies;
