'use client';
import { useJobByIdQuery } from '@elncr/api-service';
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function JobDetailPage({
  params,
}: {
  params: {
    id: string; // params.id is a string in url
  };
}) {
  const id = +params.id;
  const { data: job } = useJobByIdQuery(id, {});

  if (!job) {
    // todo: handle job loading state
    return null;
  }

  console.log(job);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 mt-[100px]">
          <div className="w-full flex gap-4">
            <div className="w-[80%]">
              <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
              <div className="whitespace-pre-wrap">{job.description}</div>
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">How to apply</h2>
                <div className="whitespace-pre-wrap">{job.howToApply}</div>
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Salary Range</h2>
                <p>
                  {job.minSalary}$ to {job.maxSalary}$
                </p>
              </div>
            </div>
            <div className="w-[20%]">
              <h2 className="text-2xl font-bold mb-4 text-center">Company</h2>
              <div className="mx-auto px-4 py-8 sm:px-6">
                <div className="text-center">
                  <div className="text-center">
                    <img
                      className="h-36 w-36 rounded-full mx-auto"
                      src={job.user?.company.image}
                      alt=""
                    />
                    <div className="text-sm text-gray-800 font-semibold mb-1">
                      {job.user?.company.name}
                    </div>
                  </div>
                  <Link
                    className="btn-sm text-white bg-indigo-500 hover:bg-indigo-600 w-full shadow-sm"
                    href={`/apply-job/${job.id}`}
                  >
                    Apply
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
