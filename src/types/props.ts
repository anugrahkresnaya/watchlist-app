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
