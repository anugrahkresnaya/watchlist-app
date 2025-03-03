import axios from 'axios';
import { useEffect, useState } from 'react';

const useVideos = (id: string, type: 'movies' | 'tv') => {
  const [video, setVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(`/api/${type}/trailer?id=${id}`);
        console.log('data', data);
        const trailerKey = data.key;
        setVideo(
          trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : null
        ); // Only store the trailer URL
      } catch (error) {
        console.error(`Failed fetching ${type} video`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id, type]);

  return { video, loading };
};

export default useVideos;
