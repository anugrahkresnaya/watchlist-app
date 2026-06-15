import { NextResponse } from 'next/server';
import { tmdb } from '@/lib/tmdb';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tvId = searchParams.get('id');

  if (!tvId) {
    return NextResponse.json({ error: 'Tv ID is required' }, { status: 400 });
  }

  try {
    const { data } = await tmdb.get(`/tv/${tvId}/recommendations`);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error while fetching tv recommendations', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
