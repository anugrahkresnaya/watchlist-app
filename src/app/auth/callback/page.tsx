'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthCallback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const API_KEY_TMDB = process.env.NEXT_PUBLIC_API_KEY_TMDB;
    console.log('api key', API_KEY_TMDB);
    const reqToken = searchParams.get('request_token');
    const approved = searchParams.get('approved');
    console.log('req token', reqToken);

    if (!reqToken || approved !== 'true') {
      router.push('/auth/error?message=Login failed or not approved');
      return;
    }

    const createSession = async () => {
      const res = await fetch(
        'https://api.themoviedb.org/3/authentication/session/new',
        {
          method: 'POST',
          body: JSON.stringify({ request_token: reqToken }),
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY_TMDB}`
          }
        }
      );

      const data = await res.json();

      if (!data.success) {
        router.push('/auth/error?message=Failed to create a session');
      } else {
        router.push('/');
      }
    };

    createSession();
  }, [searchParams, router]);

  return <p>Processing authentication...</p>;
};

export default AuthCallback;
