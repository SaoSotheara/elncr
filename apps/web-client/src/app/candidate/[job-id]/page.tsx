'use client';

import { useCurrentUserQuery, useJobByIdQuery } from '@elncr/api-service';
import { useRouter } from 'next/navigation';
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CandidateList({
  params,
}: {
  params: {
    'job-id': string; // params.id is a string in url
  };
}) {
  const id = +params['job-id'];
  const router = useRouter();
  const { isLoading, user } = useCurrentUserQuery();
  const { data: job } = useJobByIdQuery(id, { enabled: !!user });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    router.push(`/sign-in?redirect=/apply-job/[${id}]`);
  }

  if (!job) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <section className="">
        <main className="grow">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-[100px] flex grid grid-cols-3 gap-4 min-h-[80vh]">
            {job?.candidates?.length === 0 && (
              <div className="flex flex-col justify-center items-center">
                <div className="text-2xl font-bold mb-4 text-center">
                  No candidate applied for this job
                </div>
              </div>
            )}

            {job?.candidates?.map((candidate: any) => {
              return (
                <div
                  key={candidate.id}
                  className="w-[300px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-[330px]"
                >
                  <div className="flex flex-col items-center pb-2 pt-4">
                    <img
                      className="w-24 h-24 mb-3 rounded-full shadow-lg"
                      src={candidate.user.profileImageUrl}
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      {candidate.user.firstName} {candidate.user.lastName}
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {candidate.user.email}
                    </span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                      <a
                        href={candidate.cvFileUrl}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        download={candidate.cvFileUrl}
                        target="_blank"
                      >
                        Download CV
                      </a>
                    </div>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                      <a
                        href={candidate.coverLetterFileUrl}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                        download={candidate.coverLetterFileUrl}
                        target="_blank"
                      >
                        Download Cover Letter
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <Footer />
      </section>
    </div>
  );
}
