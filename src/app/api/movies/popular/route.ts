import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const API_KEY_TMDB = process.env.API_KEY_TMDB;
    const lang = 'en-US';
    const page = 1;

    const { data } = await axios.get(
      'https://api.themoviedb.org/3/movie/popular',
      {
        params: { language: lang, page },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${API_KEY_TMDB}`
        }
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('error fetching popular movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
