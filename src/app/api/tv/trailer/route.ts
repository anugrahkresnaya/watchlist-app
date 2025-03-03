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
    const { data } = await axios.get(`${BASE_URL}/tv/${tvId}/videos`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY_TMDB}`
      }
    });
    console.log('data trailers', data);

    const trailers = data.results.filter(
      (video: any) => video.type === 'Trailer'
    );

    return NextResponse.json(trailers.length > 0 ? trailers[0] : {});
  } catch (error) {
    console.error('Error while fetching tv details', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
