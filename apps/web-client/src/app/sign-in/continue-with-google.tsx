'use client';

import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { firebaseAuth } from '@elncr/api-service';

export const ContinueWithGoogle = () => {
  const router = useRouter();
  const [_, isLoading] = useAuthState(firebaseAuth, {
    onUserChanged: (user) => {
      if (user) {
        router.push('/finish-sign-up');
      }
      return Promise.resolve();
    },
  });

  const continueWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(firebaseAuth, provider);
      router.push('/finish-sign-up');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="btn-sm text-sm text-white bg-rose-500 hover:bg-rose-600 w-full relative flex after:flex-1 group"
      onClick={continueWithGoogle}
      disabled={isLoading}
    >
      <div className="flex-1 flex items-center">
        <svg
          className="w-4 h-4 fill-current text-rose-200 shrink-0"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.679 6.545H8.043v3.273h4.328c-.692 2.182-2.401 2.91-4.363 2.91a4.727 4.727 0 1 1 3.035-8.347l2.378-2.265A8 8 0 1 0 8.008 16c4.41 0 8.4-2.909 7.67-9.455Z" />
        </svg>
      </div>
      <span className="flex-auto text-rose-50 pl-3">
        {isLoading ? 'Signing in...' : 'Continue with Google'}
        <span className="inline-flex tracking-normal text-rose-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
          -&gt;
        </span>
      </span>
    </button>
  );
};
