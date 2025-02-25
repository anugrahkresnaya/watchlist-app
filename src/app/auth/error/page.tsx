'use client';

// import { useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
// import { toast } from 'sonner'

const AuthError = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const errorMessage =
    searchParams.get('message') || 'An unknown error occurred';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold text-red-500">Authentication Error</h1>
      <p className="mt-2 text-gray-600">{errorMessage}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={() => router.push('/')}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default AuthError;
