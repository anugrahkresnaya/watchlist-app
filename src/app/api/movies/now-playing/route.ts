import { NextResponse } from 'next/server';
import { tmdb } from '@/lib/tmdb';

export async function GET() {
  try {
    const { data } = await tmdb.get('/movie/now_playing');

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching now playing:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
