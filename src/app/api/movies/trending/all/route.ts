import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const API_KEY_TMDB = process.env.API_KEY_TMDB;
    const timeWindow = 'week';

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/${timeWindow}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${API_KEY_TMDB}`
        }
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching all trending:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
