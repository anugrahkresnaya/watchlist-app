import axios from 'axios';

export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.API_KEY_TMDB}`
  }
});
