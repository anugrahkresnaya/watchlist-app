import MediaDetails from '@/components/media-details';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  if (!id) {
    return <p>Invalid Movie ID!</p>;
  }

  const res = await fetch(`${BASE_URL}/api/movies/details?id=${id}`);
  if (!res.ok) {
    return <p>Failed to fetch movie details data</p>;
  }
  const data = await res.json();

  const resCredits = await fetch(`${BASE_URL}/api/movies/casts?id=${id}`);
  if (!resCredits.ok) {
    return <p>Failed to fetch movie credits data</p>;
  }
  const credits = await resCredits.json();

  const resVideos = await fetch(`${BASE_URL}/api/movies/trailer?id=${id}`);
  if (!resVideos.ok) {
    return <p>Failed to fetch movie trailer</p>;
  }
  const trailer = await resVideos.json();

  return (
    <MediaDetails
      id={id}
      type="movie"
      title={data.title}
      releaseYear={new Date(data.release_date).getFullYear().toString()}
      runtime={data.runtime}
      genres={data.genres.map((g: any) => g.name)}
      rating={data.vote_average}
      overview={data.overview}
      posterPath={data.poster_path}
      backdropPath={data.backdrop_path}
      cast={credits.cast}
      crew={credits.crew}
      trailerKey={trailer.key}
    />
  );
};

export default MoviePage;
