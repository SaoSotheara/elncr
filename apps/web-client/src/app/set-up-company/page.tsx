'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import { useForm } from 'react-hook-form';
import {
  uploadFile,
  useCurrentUserQuery,
  zodResolver,
} from '@elncr/api-service';
import { z } from 'zod';

import { useRouter } from 'next/navigation';
import { useSetupCompanyMutation } from '@elncr/api-service';
import Footer from '../components/Footer';

import Image06 from '../images/company-icon-06.svg';

const SetupCompanySchemaForm = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be 2 or more characters long' }),
  website: z
    .string()
    .trim()
    .toLowerCase()
    .refine((val) => (val ? val.indexOf('.') !== -1 : true), {
      message: 'Invalid URL',
    })
    .optional(),
  image: z.string().url().optional(),
  address: z
    .string()
    .min(5, { message: 'Address must be 5 or more characters long' }),
});

type SetupCompanyForm = z.infer<typeof SetupCompanySchemaForm>;

function SetUpCompany() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SetupCompanyForm>({
    resolver: zodResolver(SetupCompanySchemaForm),
  });

  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);

  const { user, isLoading } = useCurrentUserQuery();

  if (!user && !isLoading) {
    router.push('/sign-in');
  } else if (user?.company) {
    router.push('/');
  }

  const uploadImage = async (file: File) => {
    if (!file) {
      return;
    }

    setIsUploading(true);
    const url = await uploadFile(file);
    setIsUploading(false);
    setValue('image', url);
  };

  const { mutateAsync: setupCompany } = useSetupCompanyMutation();

  const onSubmit = async (data: SetupCompanyForm) => {
    await setupCompany({ data: { ...data, image: getValues('image') } });

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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div className="w-full p-8 mx-2 col-span-2 flex justify-center text-center bg-gradient-to-b from-indigo-100 to-white ">
                    <label htmlFor="profile-image" className="text-center">
                      <p>Click on Profile to change Photo</p>
                      <img
                        className="h-32 w-32 border object-cover rounded-full cursor-pointer mx-auto mt-4"
                        src={watch('image') ?? Image06.src}
                        alt=""
                      />
                    </label>
                    <input
                      type="file"
                      hidden
                      id="profile-image"
                      onChange={(event: any) => {
                        uploadImage(event.target.files[0]);
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Name"
                      {...register('name', { required: true })}
                      required
                    />
                    {errors.name && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {errors.name?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="website"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Website URL
                    </label>
                    <input
                      type="text"
                      id="website"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="example.com"
                      {...register('website')}
                    />
                    {errors.website && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {errors.website?.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your address here..."
                      {...register('address')}
                    ></textarea>
                    {errors.address && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {errors.address?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I agree with the{' '}
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      terms and conditions
                    </a>
                    .
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                    isSubmitting || isUploading
                      ? 'bg-gray-600 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </main>
      </section>

      {/* Site footer */}
      <Footer />
    </div>
  );
}

export default SetUpCompany;
