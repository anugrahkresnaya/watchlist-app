import { Movie } from './movie';

export type MovieSectionProps = {
  title: string;
  movies: Movie[];
  loading: boolean;
  link: string;
};

export type BestOfTheWeekProps = {
  allTrending: Movie[];
};

export interface MediaDetailsProps {
  id: number | string;
  type: 'movies' | 'tv';
  title: string;
  releaseYear: string;
  runtime?: number;
  genres: string[];
  rating: number;
  overview: string;
  posterPath: string;
  backdropPath: string;
}

export interface TrailerModalProps {
  id: number | string;
  type: 'movies' | 'tv';
}
