import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MovieSectionProps } from '@/types/props';

export const FALLBACK_IMAGE = '/fallback.jpg';

const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  movies,
  loading,
  link
}) => {
  return (
    <div className="mt-10">
      <div className="flex justify-between mt-10">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button asChild>
          <Link href={link}>Show All</Link>
        </Button>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="flex flex-wrap justify-center md:justify-between gap-4 mt-4">
          {movies.slice(0, 6).map(movie => (
            <li key={movie.id} className="min-w-[170px] max-w-[170px]">
              <Link href={`/${movie.media_type ?? 'movie'}/${movie.id}`}>
                <div className="w-full aspect-[2/3] relative">
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : FALLBACK_IMAGE
                    }
                    alt={movie.title || 'show poster'}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 170px"
                    priority
                  />
                </div>
                <h2 className="text-sm font-semibold mt-2 text-center truncate">
                  {movie.title || movie.name}
                </h2>
                <p className="text-xs text-gray-500 text-center">
                  {movie.release_date || movie.first_air_date}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieSection;
