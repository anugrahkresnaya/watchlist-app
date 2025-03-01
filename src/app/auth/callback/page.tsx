'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setReqToken, setSessionId } from '@/store/authSlice';

const AuthCallback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) {
      return;
    }
    hasFetched.current = true;
    const API_KEY_TMDB = process.env.NEXT_PUBLIC_API_KEY_TMDB;
    const reqToken = searchParams.get('request_token');
    const approved = searchParams.get('approved');

    if (!reqToken || approved !== 'true') {
      router.push('/auth/error?message=Login failed or not approved');
      return;
    }

    const createSession = async () => {
      const { data } = await axios.post(
        'https://api.themoviedb.org/3/authentication/session/new',
        { request_token: reqToken },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY_TMDB}`
          }
        }
      );

      if (!data.success) {
        router.push('/auth/error?message=Failed to create a session');
      } else {
        dispatch(setSessionId(data?.session_id));
        dispatch(setReqToken(null));
        router.push('/');
      }
    };

    createSession();
  }, [searchParams, router, dispatch]);

  return <p>Processing authentication...</p>;
};

export default AuthCallback;
