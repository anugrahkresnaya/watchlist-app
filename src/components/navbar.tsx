'use client';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { setReqToken } from '@/store/authSlice';
import { RootState } from '@/store';
import { ModeToggle } from './ui/mode-toggle';
import { Button } from './ui/button';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Navbar = () => {
  const dispatch = useDispatch();
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);
  const reqToken = useSelector((state: RootState) => state.auth.reqToken);
  const hasFetched = useRef(false);
  const [loading, setLoading] = useState(false);

  const headers = useMemo(
    () => ({
      'Content-Type': 'application/json'
    }),
    []
  );

  const fetchToken = useCallback(async () => {
    if (hasFetched.current || reqToken || sessionId) {
      return;
    }
    hasFetched.current = true;
    console.log('session id exist', sessionId);

    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_BASE_URL}/api/auth/tmdb-auth/request-token`,
        { headers }
      );

      const token = data?.request_token;
      if (token) {
        dispatch(setReqToken(token));
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [reqToken, sessionId, dispatch, headers]);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return (
    <nav className="flex justify-between my-4">
      <h1 className="font-bold text-2xl">
        <Link href="/">CrowzyNest</Link>
      </h1>
      <ul className="flex justify-evenly items-center gap-4">
        <li>
          <Link href="/test-page">
            <Button variant="link">Create</Button>
          </Link>
        </li>
        {sessionId ? (
          <li>
            <Button variant="link">Hellooo! yourname</Button>
          </li>
        ) : reqToken ? (
          <li>
            <a
              href={`https://www.themoviedb.org/authenticate/${reqToken}?redirect_to=${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`}
            >
              <Button variant="link">Login</Button>
            </a>
          </li>
        ) : (
          <li>{loading ? 'Loading...' : 'Login Unavailable'}</li>
        )}
        <li>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
