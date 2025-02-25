import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const API_KEY_TMDB = process.env.API_KEY_TMDB;

    const response = await axios.get(
      'https://api.themoviedb.org/3/authentication/token/new',
      {
        headers: { Authorization: `Bearer ${API_KEY_TMDB}` }
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get request token' },
      { status: 500 }
    );
  }
}
