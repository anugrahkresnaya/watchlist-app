import { NextResponse } from 'next/server';
import { tmdb } from '@/lib/tmdb';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const movieId = searchParams.get('id');

  if (!movieId) {
    return NextResponse.json(
      { error: 'Movie ID is required' },
      { status: 400 }
    );
  }

  try {
    const { data } = await tmdb.get(`/movie/${movieId}/credits`);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error while fetching movie credits', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
