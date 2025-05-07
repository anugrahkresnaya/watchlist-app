import Link from 'next/link';
import { CastSectionProps } from '@/types/props';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getInitials } from '@/lib/utils';

const CreditSection: React.FC<CastSectionProps> = ({
  casts = [],
  crews = []
}) => {
  return (
    <div>
      {casts.length > 0 && (
        <div className="my-10">
          <h1 className="text-2xl font-bold mb-10">Casts</h1>
          <div className="flex flex-wrap justify-evenly">
            {casts.map(cast => (
              <Link
                key={cast.id + cast.name}
                href={`/person/${cast.id}`}
                className="flex flex-col items-center text-center"
              >
                <Avatar className="w-52 h-52">
                  <AvatarImage
                    src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-6xl">
                    {getInitials(cast.name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-medium">{cast.name}</h3>
                <p className="text-sm text-zinc-500">{cast.character}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
      {crews.length > 0 && (
        <div className="my-10">
          <h1 className="text-2xl font-bold mb-10">Crews</h1>
          <div className="flex flex-wrap justify-evenly">
            {crews.map(crew => (
              <Link
                key={crew.id + crew.job}
                href={`/person/${crew.id}`}
                className="flex items-center flex-col mb-10"
              >
                <Avatar className="w-52 h-52">
                  <AvatarImage
                    src={`https://image.tmdb.org/t/p/original${crew.profile_path}`}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-6xl">
                    {getInitials(crew.name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-medium">{crew.name}</h3>
                <p className="text-sm text-zinc-500">{crew.job}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditSection;
