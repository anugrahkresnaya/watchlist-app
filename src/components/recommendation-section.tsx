import { RecommendationSectionProps } from "@/types/props"
import Image from "next/image"
import Link from "next/link"
import { FALLBACK_IMAGE } from "./movie-section"
import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ movies }) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold items-center">Shows you might like</h2>
      <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {movies.map((movie) => (
          <CarouselItem key={movie.id} className="pl- basis-auto overflow-hidden">
            <div className="p-1">
            <div className="w-[120px] h-[180px] relative">
              <Image
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w185${movie.poster_path}` : FALLBACK_IMAGE}
                alt={movie.title || "show poster"}
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="120px"
                priority
              />
            </div>
            <h2 className="text-xs font-semibold mt-2 text-center truncate w-[120px]">
              {movie.title || movie.name}
            </h2>
            <p className="text-xs text-gray-500 text-center">
              {movie.release_date || movie.first_air_date}
            </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>


    </div>
  )
}

export default RecommendationSection
