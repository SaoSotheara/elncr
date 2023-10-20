import React from 'react';
import JobListForUser from '../components/JobListForUser';
import Link from 'next/link';

export default function Candidate() {
  return (
    <main className="flex container mx-auto">
      {/* Content */}
      <div className="min-h-screen w-full">
        <div className="h-full">
          <div className="h-full w-full px-6 mx-auto flex flex-col">
            {/* Site header */}
            <header className="flex-1 flex mb-auto">
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

            <div className="">
              <div className="mb-10">
                <h1 className="text-4xl font-extrabold font-inter mb-2">
                  Here is the job that has been applied
                </h1>
                <div className="text-gray-500">
                  You can see the job that you have applied and click to see the
                  detail about who applied the job
                </div>
              </div>
              <section>
                <div className="mx-auto px-4 sm:px-6">
                  <div className="py-8 md:py-16">
                    <div
                      className="md:flex md:justify-between"
                      data-sticky-container
                    >
                      <div className="md:grow">
                        <JobListForUser />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
