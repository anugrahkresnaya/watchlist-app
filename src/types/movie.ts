export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  name?: string; // Optional since some responses might not have it
  overview: string;
  first_air_date?: string;
  media_type?: string;
  vote_average?: number;
};
