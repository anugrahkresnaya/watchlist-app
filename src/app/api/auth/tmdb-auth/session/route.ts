import { NextRequest, NextResponse } from 'next/server';
import { tmdb } from '@/lib/tmdb';

export async function POST(request: NextRequest) {
  try {
    const { request_token } = await request.json();

    if (!request_token) {
      return NextResponse.json(
        { error: 'request_token is required' },
        { status: 400 }
      );
    }

    const { data } = await tmdb.post('/authentication/session/new', {
      request_token
    });

    if (!data.success) {
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      );
    }

    return NextResponse.json({ session_id: data.session_id });
  } catch (err) {
    console.error('Failed to create TMDB session:', err);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
