'use client';
import { useParams } from 'next/navigation';
import MediaDetails from '@/components/media-details';
import useDetails from '@/hooks/useDetails';

const TvPage = () => {
  const params = useParams();
  const id = params.id?.toString();
  if (!id) {
    return <p>Invalid TV Show ID!</p>;
  }
  const { show, loading } = useDetails(id, 'tv');

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!show) {
    return <p>TV Show not found!</p>;
  }

  return (
    <MediaDetails
      id={id}
      type="tv"
      title={show.title}
      releaseYear={new Date(show.release_date).getFullYear().toString()}
      runtime={show.runtime}
      genres={show.genres.map((g: any) => g.name)}
      rating={show.vote_average}
      overview={show.overview}
      posterPath={show.poster_path}
      backdropPath={show.backdrop_path}
    />
  );
};

export default TvPage;
