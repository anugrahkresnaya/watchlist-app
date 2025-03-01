'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setReqToken } from '@/store/authSlice';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Navbar = () => {
  const dispatch = useDispatch();
  const [reqToken, setReqTokenState] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/auth/tmdb-auth/request-token`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const token = data?.request_token;
        console.log('token navbar', token);
        setReqTokenState(token);
        dispatch(setReqToken(token));
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    };

    fetchToken();
  }, [dispatch]);

  return (
    <nav className="flex justify-between">
      <h1>Watchlist</h1>
      <ul className="flex justify-evenly">
        <li>Create</li>
        {reqToken ? (
          <li>
            <a
              href={`https://www.themoviedb.org/authenticate/${reqToken}?redirect_to=${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`}
            >
              Login
            </a>
          </li>
        ) : (
          <li>Login Unavailable</li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
