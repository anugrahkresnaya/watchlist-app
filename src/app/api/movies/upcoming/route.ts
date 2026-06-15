import { NextResponse } from 'next/server';
import { tmdb } from '@/lib/tmdb';

export async function GET() {
  try {
    const lang = 'en-US';
    const page = 1;

    const { data } = await tmdb.get('/movie/upcoming', {
      params: { language: lang, page }
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('error fetching popular movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
