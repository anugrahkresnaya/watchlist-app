import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

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
    const API_KEY_TMDB = process.env.API_KEY_TMDB;

    const response = await axios.get('https://api.themoviedb.org/3/account', {
      headers: { Authorization: `Bearer ${API_KEY_TMDB}` },
      params: { session_id: sessionId }
    });

    console.log('response', response);

    const accountId = response.data.id;

    if (!accountId) {
      return NextResponse.json(
        { error: 'Could not determine account ID' },
        { status: 500 }
      );
    }

    const detailsResponse = await axios.get(
      `https://api.themoviedb.org/3/account/${accountId}`,
      {
        headers: { Authorization: `Bearer ${API_KEY_TMDB}` },
        params: { session_id: sessionId }
      }
    );

    return NextResponse.json(detailsResponse.data);
  } catch (error) {
    console.error('Failed to get account detail:', error);
    return NextResponse.json(
      { error: 'Failed to get account details' },
      { status: 500 }
    );
  }
}
