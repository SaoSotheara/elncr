import React from 'react';
import { useForm } from 'react-hook-form';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { z } from 'zod';
import { env, firebaseAuth, zodResolver } from '@elncr/api-service';

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: `${env.NEXT_PUBLIC_SITE_URL}/finish-sign-up`,
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios', // todo
  },
  android: {
    packageName: 'com.example.android', // todo
    installApp: true,
    minimumVersion: '12',
  },
  dynamicLinkDomain: 'elncrdev.page.link', // todo
};

const schema = z.object({
  email: z.string().email(),
});

type ValidationSchema = z.infer<typeof schema>;

export const EmailMagicLinkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitSuccessful },
    setError,
  } = useForm<ValidationSchema>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });

  const sendEmailSignInLink = async ({ email }: ValidationSchema) => {
    try {
      await sendSignInLinkToEmail(firebaseAuth, email, actionCodeSettings);
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        if (errorCode === 'auth/quota-exceeded') {
          // The email quota for this project has been exceeded.
          setError('email', {
            type: 'manual',
            message: 'Too many requests. Please try again later.',
          });
        }
      } else {
        console.log(error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(sendEmailSignInLink)}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            {...register('email')}
            id="email"
            className="form-input w-full"
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>
      </div>
      <div className="mt-6">
        {isSubmitSuccessful ? (
          <p>Magic link sent! Please check your email.</p>
        ) : (
          <button
            className="btn w-full text-white bg-indigo-500 hover:bg-indigo-600 shadow-sm group"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Get Magic Link  '}
            <span className="tracking-normal text-indigo-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
              -&gt;
            </span>
          </button>
        )}
      </div>
    </form>
  );
};
