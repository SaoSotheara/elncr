'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Illustration from '../images/auth-illustration.svg';
import TestimonialAuth04 from '../images/testimonial-auth-04.jpg';
import TestimonialAuth05 from '../images/testimonial-auth-05.jpg';
import TestimonialAuth06 from '../images/testimonial-auth-06.jpg';
import {
  createJob,
  getJobTags,
  getJobTypes,
  useCurrentUserQuery,
  zodResolver,
} from '@elncr/api-service';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

const postJobSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  minSalary: z
    .string()
    .min(1)
    .transform((val) => Number(val)),
  maxSalary: z
    .string()
    .min(1)
    .transform((val) => Number(val)),
  tagIds: z.string().transform((val) => [Number(val)]),
  jobTypeId: z.string().transform((val) => Number(val)),
  howToApply: z.string().optional(),
});

type PostJobForm = z.infer<typeof postJobSchema>;

function PostAJob() {
  const { isLoading, user } = useCurrentUserQuery();
  const { data: jobTypes } = useQuery({
    queryKey: ['jobTypes'],
    queryFn: getJobTypes,
  });
  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: getJobTags,
  });
  const router = useRouter();
  const { handleSubmit, formState, register } = useForm<PostJobForm>({
    resolver: zodResolver(postJobSchema),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('sign-in?redirect=post-a-job');
    return <div>Redirecting...</div>;
  }

  if (!user.company) {
    router.push('set-up-company?redirect=post-a-job');
    return <div>Redirecting...</div>;
  }

  const handleCreateJob = async (data: PostJobForm) => {
    await createJob(data);
    router.push('/');
  };

  return (
    <main className="flex">
      {/* Content */}
      <div className="min-h-screen w-full lg:w-1/2">
        <div className="h-full">
          <div className="h-full w-full max-w-md px-6 mx-auto flex flex-col after:mt-auto after:flex-1">
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

            <div className="flex-1 py-8">
              <div className="mb-10">
                <h1 className="text-4xl font-extrabold font-inter mb-2">
                  Post a job
                </h1>
                <div className="text-gray-500">
                  Fill in the form below to get your job listed on our job board
                </div>
              </div>

              {/* Form */}
              <form className="mb-12" onSubmit={handleSubmit(handleCreateJob)}>
                <div className="divide-y divide-gray-200 -my-6">
                  {/* Group #1 */}
                  <div className="py-6">
                    <div className="text-lg font-bold text-gray-800 mb-5">
                      <span className="text-indigo-500">1.</span> Your company
                      Info
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="block text-sm font-medium mb-1">
                          Company Name: {user.company.name}
                        </p>
                        <img src={user.company.image} alt="" />
                      </div>
                    </div>
                  </div>

                  {/* Group #2 */}
                  <div className="py-6">
                    <div className="text-lg font-bold text-gray-800 mb-5">
                      <span className="text-indigo-500">2.</span> The role
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="form-input w-full"
                          type="text"
                          placeholder="E.g., Senior Software Engineer"
                          {...register('title')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-800 font-medium mb-1">
                          Role
                        </label>
                        <select
                          className="form-select text-sm py-2 w-full"
                          {...register('jobTypeId')}
                        >
                          {jobTypes?.map((jobType: any) => (
                            <option key={jobType.id} value={jobType.id}>
                              {jobType.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-800 font-medium mb-1">
                          Tag
                        </label>
                        <select
                          className="form-select text-sm py-2 w-full"
                          {...register('tagIds')}
                        >
                          {tags?.map((tag: any) => (
                            <option key={tag.id} value={tag.id}>
                              {tag.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-800 font-medium mb-1">
                          Job Description{' '}
                        </label>
                        <textarea
                          id="description"
                          className="form-textarea text-sm py-2 w-full"
                          rows={4}
                          {...register('description')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-800 font-medium mb-1">
                          How To Apply{' '}
                        </label>
                        <textarea
                          id="howToApply"
                          className="form-textarea text-sm py-2 w-full"
                          rows={4}
                          {...register('howToApply')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Min Salary{' '}
                          <span className="text-gray-500">(optional)</span>
                        </label>
                        <input
                          id="salary"
                          className="form-input w-full"
                          type="number"
                          {...register('minSalary')}
                        />
                        <div className="text-xs text-gray-500 italic mt-2">
                          Example: 100
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Max Salary{' '}
                            <span className="text-gray-500">(optional)</span>
                          </label>
                          <input
                            className="form-input w-full"
                            type="number"
                            {...register('maxSalary')}
                          />
                          <div className="text-xs text-gray-500 italic mt-2">
                            Example: 100000
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn w-full text-white bg-indigo-500 hover:bg-indigo-600 shadow-sm"
                    >
                      Save
                    </button>
                    <p>
                      {formState.errors &&
                        Object.keys(formState.errors).map((error, index) => (
                          <p
                            key={index}
                            className="text-red-500 text-xs italic"
                          >
                            {((formState.errors as any)[error] as any)?.message}
                          </p>
                        ))}
                    </p>
                    <p className="text-green-300">
                      {formState.isSubmitSuccessful ? 'Profile Updated' : ''}
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div
        className="fixed right-0 top-0 bottom-0 hidden lg:block lg:w-1/2 overflow-hidden"
        aria-hidden="true"
      >
        {/* Bg */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-white pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Illustration */}
        <div
          className="hidden md:block absolute right-0 pointer-events-none -z-10"
          aria-hidden="true"
        >
          <Image
            src={Illustration}
            className="max-w-none"
            width="1440"
            height="900"
            alt="Page Illustration"
          />
        </div>

        {/* Quotes */}
        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="px-5 sm:px-6 py-8">
            <div className="w-full max-w-xl mx-auto">
              <div className="space-y-3 group">
                {/* Testimonial */}
                <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl opacity-30 hover:opacity-100 transition duration-150 ease-in-out">
                  <div className="flex items-center space-x-5">
                    <div className="relative shrink-0">
                      <Image
                        className="rounded-full"
                        src={TestimonialAuth04.src}
                        width="88"
                        height="88"
                        alt="Testimonial 04"
                      />
                      <svg
                        className="absolute top-0 right-0 fill-indigo-400"
                        width="26"
                        height="17"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 16.026h8.092l6.888-16h-4.592L0 16.026Zm11.02 0h8.092L26 .026h-4.65l-10.33 16Z" />
                      </svg>
                    </div>
                    <figure>
                      <blockquote className="font-bold m-0 pb-1">
                        <p>
                          Listing our jobs through JobBoard was simple, quick,
                          and helped us find amazing candidates.
                        </p>
                      </blockquote>
                      <figcaption className="text-sm font-medium">
                        Lisa Smith, developer at{' '}
                        <a className="text-sky-500 hover:underline" href="#0">
                          AppyYou
                        </a>
                      </figcaption>
                    </figure>
                  </div>
                </div>
                {/* Testimonial */}
                <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl hover:opacity-100 transition duration-150 ease-in-out">
                  <div className="flex items-center space-x-5">
                    <div className="relative shrink-0">
                      <Image
                        className="rounded-full"
                        src={TestimonialAuth05.src}
                        width="88"
                        height="88"
                        alt="Testimonial 05"
                      />
                      <svg
                        className="absolute top-0 right-0 fill-indigo-400"
                        width="26"
                        height="17"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 16.026h8.092l6.888-16h-4.592L0 16.026Zm11.02 0h8.092L26 .026h-4.65l-10.33 16Z" />
                      </svg>
                    </div>
                    <figure>
                      <blockquote className="font-bold m-0 pb-1">
                        <p>
                          Listing our jobs through JobBoard was simple, quick,
                          and helped us find amazing candidates.
                        </p>
                      </blockquote>
                      <figcaption className="text-sm font-medium">
                        Mark Mills, developer at{' '}
                        <a className="text-sky-500 hover:underline" href="#0">
                          App.com
                        </a>
                      </figcaption>
                    </figure>
                  </div>
                </div>
                {/* Testimonial */}
                <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl opacity-30 hover:opacity-100 transition duration-150 ease-in-out">
                  <div className="flex items-center space-x-5">
                    <div className="relative shrink-0">
                      <Image
                        className="rounded-full"
                        src={TestimonialAuth06.src}
                        width="88"
                        height="88"
                        alt="Testimonial 06"
                      />
                      <svg
                        className="absolute top-0 right-0 fill-indigo-400"
                        width="26"
                        height="17"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 16.026h8.092l6.888-16h-4.592L0 16.026Zm11.02 0h8.092L26 .026h-4.65l-10.33 16Z" />
                      </svg>
                    </div>
                    <figure>
                      <blockquote className="font-bold m-0 pb-1">
                        <p>
                          Listing our jobs through JobBoard was simple, quick,
                          and helped us find amazing candidates.
                        </p>
                      </blockquote>
                      <figcaption className="text-sm font-medium">
                        Lisa Smith, developer at{' '}
                        <a className="text-sky-500 hover:underline" href="#0">
                          AppyYou
                        </a>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PostAJob;
