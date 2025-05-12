export interface TMDBUserProfile {
  id: number;
  name: string;
  username: string;
  avatar?: {
    gravatar?: {
      hash?: string;
    };
    tmdb?: {
      avatar_path?: string;
    };
  };
  iso_639_1?: string;
  iso_3166_1?: string;
  include_adult?: boolean;
}

export interface UserProfileProps {
  userId?: number;
  sessionId?: string;
}
