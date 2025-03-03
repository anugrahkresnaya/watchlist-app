import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

const useDetails = (id: string, type: 'movies' | 'tv') => {
  const [show, setShow] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const fetchDetails = useCallback(async () => {
    if (hasFetched.current) {
      return;
    }
    hasFetched.current = true;

    try {
      const { data } = await axios.get(`/api/${type}/details?id=${id}`);
      setShow(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  }, [id, type]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return { show, loading };
};

export default useDetails;
