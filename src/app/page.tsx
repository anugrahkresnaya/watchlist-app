'use client';
import MovieSection from '@/components/movie-section';
import useMovies from '@/hooks/useMovies';
import BestOfTheWeek from '@/components/bestOfTheWeek';

export default function Home() {
  const { movies: popularMovies, loading: loadingPopular } = useMovies(
    '/api/movies/popular'
  );
  const { movies: allTrending, loading: loadingTrending } = useMovies(
    '/api/movies/trending/all'
  );
  const { movies: nowPlaying, loading: loadingNowPlaying } = useMovies(
    '/api/movies/now-playing'
  );
  const { movies: upcoming, loading: loadingUpcoming } = useMovies(
    '/api/movies/upcoming'
  );

  return (
    <div className="px-6 py-4">
      <BestOfTheWeek allTrending={allTrending} />
      <MovieSection
        title="Now Playing"
        movies={nowPlaying}
        loading={loadingNowPlaying}
        link="/now-playing"
      />
      <MovieSection
        title="Popular Movies Right Now"
        movies={popularMovies}
        loading={loadingPopular}
        link="/popular-movies"
      />
      <MovieSection
        title="Trending"
        movies={allTrending}
        loading={loadingTrending}
        link="/trending"
      />
      <MovieSection
        title="Upcoming Shows"
        movies={upcoming}
        loading={loadingUpcoming}
        link="/upcoming"
      />
    </div>
  );
}
