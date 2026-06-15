import { NextResponse } from 'next/server';
import { tmdb } from '@/lib/tmdb';

export async function GET() {
  try {
    const response = await tmdb.get('/authentication/token/new');

    return NextResponse.json(response.data);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to get request token', err },
      { status: 500 }
    );
  }
}
