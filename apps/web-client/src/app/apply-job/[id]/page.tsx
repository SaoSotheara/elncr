'use client';

import {
  uploadFile,
  useApplyJobMutation,
  useCurrentUserQuery,
  useJobByIdQuery,
  zodResolver,
} from '@elncr/api-service';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const applyJobSchema = z.object({
  cvFileUrl: z.string().min(1),
  coverLetterFileUrl: z.string().optional(),
  message: z.string().optional(),
});

type ApplyJobForm = z.infer<typeof applyJobSchema>;

export default function ApplyJob({
  params,
}: {
  params: {
    id: string; // params.id is a string in url
  };
}) {
  const id = +params.id;
  const router = useRouter();
  const { isLoading, user } = useCurrentUserQuery();
  const { data: job } = useJobByIdQuery(id, {
    // only fetch job if user is logged in
    enabled: !!user,
  });

  const { mutateAsync: applyJob } = useApplyJobMutation();

  const { register, setValue, handleSubmit } = useForm<ApplyJobForm>({
    resolver: zodResolver(applyJobSchema),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    router.push('/sign-in?redirect=/apply-job/[id]');
  }

  if (!job) {
    // todo: handle job loading state
    return null;
  }

  const uploadImage = async (file?: File, name?: keyof ApplyJobForm) => {
    if (!file) {
      return;
    }
    const url = await uploadFile(file);
    if (name) {
      setValue(name, url);
    }
  };

  const onSubmit = async (data: ApplyJobForm) => {
    await applyJob({ id: id, data });
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <section>
        <main className="grow">
          {/* Content */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-28 pb-8 md:pt-36 md:pb-16">
              <div className="mb-10">
                <h1 className="text-4xl font-extrabold font-inter mb-2">
                  Apply for {job.title}
                </h1>
                <div className="text-gray-500">
                  Upload your resume and cover letter.
                </div>
              </div>

              {/* Form */}
              <form className="mb-12" onSubmit={handleSubmit(onSubmit)}>
                <div className="divide-y divide-gray-200 -my-6">
                  {/* Group #1 */}
                  <div className="py-6">
                    <div className="text-lg font-bold text-gray-800 mb-5">
                      <span className="text-indigo-500">👜 </span> Your CV and
                      cover
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="file"
                        >
                          CV File{' '}
                          <span className="text-gray-500">(required)</span>
                        </label>
                        <div className="flex items-center">
                          <div>
                            <input
                              onChange={(e) =>
                                uploadImage(e.target.files?.[0], 'cvFileUrl')
                              }
                              required
                              id="file"
                              type="file"
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 transition duration-150 ease-in-out cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 mt-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="file"
                        >
                          Cover Letter File{' '}
                          <span className="text-gray-500">(optional)</span>
                        </label>
                        <div className="flex items-center">
                          <div>
                            <input
                              onChange={(e) =>
                                uploadImage(
                                  e.target.files?.[0],
                                  'coverLetterFileUrl'
                                )
                              }
                              id="file"
                              type="file"
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 transition duration-150 ease-in-out cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Group #2 */}
                  <div className="py-6">
                    <div className="text-lg font-bold text-gray-800 mb-5">
                      <span className="text-indigo-500">✉️</span> Your Message
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-sm text-gray-800 font-medium mb-1"
                          htmlFor="description"
                        >
                          Give me your words{' '}
                        </label>
                        <textarea
                          id="description"
                          className="form-textarea text-sm py-2 w-full"
                          rows={4}
                          {...register('message')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="max-w-fit">
                  <button className="btn w-full text-white bg-indigo-500 hover:bg-indigo-600 shadow-sm">
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>

        {/* Site footer */}
        <Footer />
      </section>
    </div>
  );
}
