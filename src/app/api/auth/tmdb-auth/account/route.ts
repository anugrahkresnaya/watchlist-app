import { NextRequest, NextResponse } from 'next/server';
import { tmdb } from '@/lib/tmdb';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required!' },
      { status: 400 }
    );
  }

  try {
    const response = await tmdb.get('/account', {
      params: { session_id: sessionId }
    });

    const accountId = response.data.id;

    if (!accountId) {
      return NextResponse.json(
        { error: 'Could not determine account ID' },
        { status: 500 }
      );
    }

    const detailsResponse = await tmdb.get(`/account/${accountId}`, {
      params: { session_id: sessionId }
    });

    return NextResponse.json(detailsResponse.data);
  } catch (error) {
    console.error('Failed to get account detail:', error);
    return NextResponse.json(
      { error: 'Failed to get account details' },
      { status: 500 }
    );
  }
}
