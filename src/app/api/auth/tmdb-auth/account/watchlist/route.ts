import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY_TMDB = process.env.API_KEY_TMDB;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountId, mediaId, mediaType, sessionId, action } = body;

    if (!accountId || !mediaId || !mediaType || !sessionId || !action) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Log the request for debugging
    console.log('Watchlist request:', {
      accountId,
      mediaId,
      mediaType,
      action,
      apiKey: API_KEY_TMDB ? 'Present' : 'Missing'
    });

    const watchlistResponse = await axios.post(
      `https://api.themoviedb.org/3/account/${accountId}/watchlist`,
      {
        media_type: mediaType,
        media_id: parseInt(String(mediaId), 10),
        watchlist: action === 'add'
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY_TMDB}`,
          'Content-Type': 'application/json'
        },
        params: { session_id: sessionId }
      }
    );

    return NextResponse.json(watchlistResponse.data);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to update watchlist', err },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const mediaId = searchParams.get('mediaId');
    const mediaType = searchParams.get('mediaType');
    const sessionId = searchParams.get('sessionId');
    const accountId = searchParams.get('accountId');

    // fetch complete watchlist (both movies and tv shows)
    if (sessionId && accountId) {
      try {
        const moviesResponse = await axios.get(
          `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies`,
          {
            headers: { Authorization: `Bearer ${API_KEY_TMDB}` },
            params: { session_id: sessionId }
          }
        );

        const tvResponse = await axios.get(
          `https://api.themoviedb.org/3/account/${accountId}/watchlist/tv`,
          {
            headers: { Authorization: `Bearer ${API_KEY_TMDB}` },
            params: { session_id: sessionId }
          }
        );

        // combine and add media media_type
        const movies = moviesResponse.data.results.map(
          (item: Record<string, string>) => ({
            ...item,
            media_type: 'movie'
          })
        );

        const tvShows = tvResponse.data.results.map(
          (item: Record<string, string>) => ({
            ...item,
            media_type: 'tv'
          })
        );

        const combinedResults = [...movies, ...tvShows];

        return NextResponse.json({
          results: combinedResults,
          total_results: combinedResults.length,
          total_pages: 1,
          page: 1
        });
      } catch (err) {
        console.error('Failed to fetch complete watchlist:', err);
        return NextResponse.json(
          { error: 'Failed to fetch watchlist items' },
          { status: 500 }
        );
      }
    }

    // check specific item is in the watchlist
    if (!mediaId || !mediaType || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const watchlistResponse = await axios.get(
      `https://api.themoviedb.org/3/account/${accountId}/watchlist/${mediaType === 'movies' ? 'movies' : 'tv'}`,
      {
        headers: { Authorization: `Bearer ${API_KEY_TMDB}` },
        params: { session_id: sessionId }
      }
    );

    const isInWatchlist = watchlistResponse.data.results.some(
      (item: any) => item.id === parseInt(mediaId as string)
    );

    return NextResponse.json({ isInWatchlist });
  } catch (err) {
    console.error('Watchlist status check failed:', err);
    return NextResponse.json(
      { error: 'Failed to check wathclist status', err },
      { status: 500 }
    );
  }
}
