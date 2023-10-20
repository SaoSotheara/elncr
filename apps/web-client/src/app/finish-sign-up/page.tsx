'use client';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { firebaseAuth } from '@elncr/api-service';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { completeSignUp } from '@elncr/api-service';

export default function FinishSignUpPage() {
  const router = useRouter();
  useAuthState(firebaseAuth, {
    onUserChanged: async (user) => {
      if (user) {
        await router.push('/');
      }
    },
  });

  useEffect(() => {
    if (isSignInWithEmailLink(firebaseAuth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem('emailForSignIn');

      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt(
          'Please provide your email for confirmation'
        ) as string;
      }

      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(firebaseAuth, email, window.location.href)
        .then(async (result) => {
          console.log(result);
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
          await completeSignUp();
          // todo: push to `from` page
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    } else {
      completeSignUp()
        .then(() => {
          // todo: push to `from` page
          router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router]);

  return <p className="text-6xl">Loading....</p>;
}
