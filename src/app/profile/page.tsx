'use client';

import { RootState } from '@/store';
import { TMDBUserProfile } from '@/types/user';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const router = useRouter();
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);

  const [loading, setLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<TMDBUserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef<boolean>(false);

  const fetchUserProfile = useCallback(async () => {
    if (hasFetched.current) {
      return;
    }
    hasFetched.current = true;

    try {
      setLoading(true);
      const { data } = await axios.get('/api/auth/tmdb-auth/account', {
        params: { session_id: sessionId }
      });

      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile data. Pleas try again later');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    // reset hasfetched if session id changed
    hasFetched.current = false;

    if (!sessionId) {
      router.push('/');
      return;
    }

    fetchUserProfile();
  }, [sessionId, router, fetchUserProfile]);

  const getAvatarUrl = (): string => {
    if (profileData?.avatar?.tmdb?.avatar_path) {
      return `https://image.tmdb.org/t/p/original${profileData.avatar.tmdb.avatar_path}`;
    } else if (profileData?.avatar?.gravatar?.hash) {
      return `https://www.gravatar.com/avatar/${profileData.avatar.gravatar.hash}?s=200`;
    }

    return '/default-avatar.png';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-4 w-1/4 mt-2" />
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-8">
            <Skeleton className="h-48 w-48 rounded-full" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>
              {error || 'Failed to load profile data.'}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push('/')}>Return to Home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {profileData.name}
          </CardTitle>
          <CardDescription>@{profileData.username}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-8">
          <div className="relative w-48 h-48 rounded-full overflow-hidden">
            <Image
              src={getAvatarUrl()}
              alt={`${profileData.name}'s avatar`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">Account Information</h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Account ID</p>
                <p>{profileData.id}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Country</p>
                <p>{profileData.iso_3166_1 || 'Not specified'}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Language</p>
                <p>{profileData.iso_639_1 || 'Not specified'}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Adult Content</p>
                <p>{profileData.include_adult ? 'Included' : 'Excluded'}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/')}>
            Return to Home
          </Button>
          <Button
            variant="destructive"
            onClick={() => alert('This feature is not implemented yet.')}
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
