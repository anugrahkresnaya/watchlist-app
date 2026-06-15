import { NextResponse } from 'next/server';
import { tmdb } from '@/lib/tmdb';

export async function GET() {
  try {
    const timeWindow = 'week';

    const { data } = await tmdb.get(`/trending/all/${timeWindow}`);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching all trending:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
