import axios from 'axios';
import { NextResponse } from 'next/server';

const API_KEY_TMDB = process.env.NEXT_PUBLIC_API_KEY_TMDB;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tvId = searchParams.get('id');

  if (!tvId) {
    return NextResponse.json({ error: 'Tv ID is required' }, { status: 400 });
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/tv/${tvId}/credits`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY_TMDB}`
      }
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error while fetching tv credits', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
