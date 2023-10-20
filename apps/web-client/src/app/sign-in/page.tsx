'use client';
import React from 'react';
import Link from 'next/link';

import { EmailMagicLinkForm } from './email-magic-link-form';
import { ContinueWithGoogle } from './continue-with-google';

function SignIn() {
  return (
    <main className="flex">
      {/* Content */}
      <div className="min-h-screen w-full lg:w-full container mx-auto">
        <div className="h-full w-full">
          <div className="h-full w-full px-6 flex flex-col">
            {/* Site header */}
            <header className="flex-1 flex ml-0 w-full max-h-[250px]">
              <div className="flex items-center justify-between h-16 md:h-20">
                {/* Logo */}
                <Link className="block group" href="/" aria-label="Cruip">
                  <svg
                    width="32"
                    height="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-indigo-500"
                      d="M13.853 18.14 1 10.643 31 1l-.019.058z"
                    />
                    <path
                      className="fill-indigo-300"
                      d="M13.853 18.14 30.981 1.058 21.357 31l-7.5-12.857z"
                    />
                  </svg>
                </Link>
              </div>
            </header>

            <div className="flex-1 py-8 max-w-md mx-auto w-full">
              <div className="mb-10">
                <h1 className="text-4xl font-extrabold font-inter mb-2">
                  Sign in to{' '}
                  <span className="font-nycd text-indigo-500 font-normal">
                    Elncr
                  </span>
                </h1>
                <div className="text-gray-500">
                  Enter your email and we&apos;ll email you a magic link for a
                  password-free sign in.
                </div>
              </div>

              {/* Form */}
              <EmailMagicLinkForm />

              {/* Divider */}
              <div className="flex items-center my-6">
                <div
                  className="border-t border-gray-200 grow mr-3"
                  aria-hidden="true"
                />
                <div className="text-sm text-gray-500 italic">Or</div>
                <div
                  className="border-t border-gray-200 grow ml-3"
                  aria-hidden="true"
                />
              </div>

              {/* Social login */}
              <ContinueWithGoogle />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
