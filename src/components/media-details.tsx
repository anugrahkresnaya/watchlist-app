import Image from 'next/image';
import { MediaDetailsProps } from '@/types/props';
import TrailerModal from './trailer-modal';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import CreditSection from './credit-section';

const MediaDetails: React.FC<MediaDetailsProps> = async ({
  id,
  type,
  title,
  releaseYear,
  runtime,
  genres,
  rating,
  overview,
  posterPath,
  backdropPath,
  cast,
  crew,
  trailerKey
}) => {
  const FALLBACK_BACKDROP = '/fallback-backdrop.jpg';

  return (
    <div className="relative min-h-screen">
      {/* Backdrop Image */}
      <div className="relative w-full h-[50vh] lg:h-[60vh]  overflow-hidden">
        {backdropPath && (
          <Image
            src={
              backdropPath
                ? `https://image.tmdb.org/t/p/original${backdropPath}`
                : FALLBACK_BACKDROP
            }
            alt="show backdrop"
            fill
            className="object-cover brightness-100 rounded-lg"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      {/* Movie Details */}
      <div className="md:mx-32 px-6 lg:px-12 py-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
          {/* Movie Poster */}
          <div className="relative lg:translate-y-[-50%] mx-auto lg:mx-0">
            <Image
              src={
                posterPath
                  ? `https://image.tmdb.org/t/p/original${posterPath}`
                  : FALLBACK_BACKDROP
              }
              alt="show poster"
              width={200}
              height={300}
              className="rounded-lg shadow-lg"
            />
            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-4">
              <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-white rounded-lg">
                + Add to List
              </button>
              {/* <button className="bg-gray-600 hover:bg-gray-700 px-5 py-2 text-white rounded-lg">
                ▶ Watch Trailer
              </button> */}
              <TrailerModal id={id} type={type} trailerKey={trailerKey} />
            </div>
          </div>

          {/* Movie Info */}
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold">{title}</h1>
            <div className="flex items-center mt-2 space-x-4 text-sm h-5">
              <span>{releaseYear}</span>
              <Separator orientation="vertical" />
              <span>{runtime} min</span>
              <Separator orientation="vertical" />
              <span>{genres?.join(', ')}</span>
            </div>

            {/* IMDb Rating */}
            <div className="flex items-center gap-2 my-4">
              <span className="text-yellow-400 text-lg">
                ⭐ {rating.toFixed(1)}
              </span>
              <span className="bg-yellow-400 text-black px-2 py-1 text-xs rounded">
                IMDb
              </span>
            </div>

            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="credits">Credits</TabsTrigger>
                <TabsTrigger value="recommendations">
                  Recommendations
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <p className="mt-4">{overview}</p>
              </TabsContent>
              <TabsContent value="credits">
                <CreditSection casts={cast} crews={crew} />
              </TabsContent>
              <TabsContent value="recommendations"></TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetails;
