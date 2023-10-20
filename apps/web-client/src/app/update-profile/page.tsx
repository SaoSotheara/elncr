'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import React, { useEffect } from 'react';
import {
  updateMe,
  uploadFile,
  useCurrentUserQuery,
  zodResolver,
} from '@elncr/api-service';
import { useRouter } from 'next/navigation';
import { Select } from '@medusajs/ui';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

const updateProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  gender: z.string().min(1),
  address: z.string().min(1),
  phoneNumber: z.string().min(1),
  birthDate: z.string().min(1),
  profileImageUrl: z.string().optional(),
});

type UpdateProfileForm = z.infer<typeof updateProfileSchema>;

export default function UpdateProfilePage() {
  const { user, isLoading } = useCurrentUserQuery();
  const { register, setValue, reset, watch, handleSubmit, formState } =
    useForm<UpdateProfileForm>({
      resolver: zodResolver(updateProfileSchema),
    });
  const router = useRouter();

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        address: user.address,
        phoneNumber: user.phoneNumber,
        birthDate: user.birthDate,
      });
    }
  }, [reset, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/sign-in?redirect=/update-profile');
  }

  const onProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const url = await uploadFile(file);
    setValue('profileImageUrl', url);
  };

  const handleUpdateProfile = async (data: UpdateProfileForm) => {
    await updateMe(data);
  };

  console.log(formState.errors);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <section>
        <main className="grow">
          {/* Content */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <form
              className="h-[80vh] grid place-items-center"
              onSubmit={handleSubmit(handleUpdateProfile)}
            >
              <div className="border-b-2 block md:flex rounded ring-indigo-500 ring-2">
                <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8">
                  <div className="flex justify-between">
                    <span className="text-xl font-semibold block">Profile</span>
                  </div>
                  <span className="text-gray-600">
                    Update your profile information
                  </span>
                  <div className="w-full p-8 mx-2 flex justify-center text-center">
                    <label htmlFor="profile-image" className="text-center">
                      <p>Click on Profile to change Photo</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="h-32 w-32 border object-cover rounded-full cursor-pointer mx-auto mt-4"
                        src={watch('profileImageUrl') || user?.profileImageUrl}
                        alt=""
                      />
                    </label>
                    <input
                      type="file"
                      hidden
                      id="profile-image"
                      onChange={onProfileImageChange}
                    />
                    <p className="text-red-500 text-xs italic">
                      {formState.errors.profileImageUrl?.message}
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-3/5 p-8 lg:ml-4 border-l-indigo-500 border-l-2 grid grid-cols-2">
                  <div className="rounded shadow p-6">
                    <div className="pb-6">
                      <label
                        htmlFor="firstName"
                        className="font-semibold text-gray-700 block pb-1"
                      >
                        First Name
                      </label>
                      <div className="flex flex-col">
                        <input
                          id="firstName"
                          className="form-input w-full"
                          type="text"
                          placeholder=""
                          {...register('firstName')}
                        />
                        <p className="text-red-500 text-xs italic">
                          {formState.errors.firstName?.message}
                        </p>
                      </div>
                    </div>
                    <div className="pb-4">
                      <label className="font-semibold text-gray-700 block pb-1">
                        Last Name
                      </label>
                      <input
                        className="form-input w-full"
                        type="text"
                        placeholder=""
                        {...register('lastName')}
                      />
                      <p className="text-red-500 text-xs italic">
                        {formState.errors.lastName?.message}
                      </p>
                    </div>
                    <div className="pb-4">
                      <label className="font-semibold text-gray-700 block pb-1">
                        Email(Unchangeable for now)
                      </label>
                      <input
                        disabled
                        className="form-input w-full"
                        type="text"
                        placeholder=""
                        {...register('email')}
                      />
                      <p className="text-red-500 text-xs italic">
                        {formState.errors.email?.message}
                      </p>
                    </div>
                    <div className="pb-4">
                      <label
                        htmlFor="about"
                        className="font-semibold text-gray-700 block pb-1"
                      >
                        Gender
                      </label>
                      <Select
                        onValueChange={(value) => {
                          setValue('gender', value);
                        }}
                      >
                        <Select.Trigger>
                          <Select.Value placeholder="Select a currency" />
                        </Select.Trigger>
                        <Select.Content>
                          {['Male', 'Female'].map((item, index) => (
                            <Select.Item key={index} value={item}>
                              {item}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select>
                      <p className="text-red-500 text-xs italic">
                        {formState.errors.gender?.message}
                      </p>
                    </div>
                  </div>
                  <div className="rounded shadow p-6">
                    <div className="pb-6">
                      <label className="font-semibold text-gray-700 block pb-1">
                        Address
                      </label>
                      <div className="flex flex-col">
                        <input
                          className="form-input w-full"
                          type="text"
                          placeholder=""
                          {...register('address')}
                        />
                        <p className="text-red-500 text-xs italic">
                          {formState.errors.address?.message}
                        </p>
                      </div>
                    </div>
                    <div className="pb-4">
                      <label className="font-semibold text-gray-700 block pb-1">
                        Phone Number
                      </label>
                      <input
                        className="form-input w-full"
                        type="text"
                        placeholder=""
                        {...register('phoneNumber')}
                      />
                      <p className="text-red-500 text-xs italic">
                        {formState.errors.phoneNumber?.message}
                      </p>
                    </div>
                    <div className="pb-4">
                      <label className="font-semibold text-gray-700 block pb-1">
                        Birthday
                      </label>
                      <input
                        className="form-input w-full"
                        type="text"
                        placeholder=""
                        {...register('birthDate')}
                      />
                      <p className="text-red-500 text-xs italic">
                        {formState.errors.birthDate?.message}
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="btn w-full text-white bg-indigo-500 hover:bg-indigo-600 shadow-sm"
                    >
                      Save
                    </button>
                    <p className="text-green-300">
                      {formState.isSubmitSuccessful ? 'Profile Updated' : ''}
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>

        {/* Site footer */}
        <Footer />
      </section>
    </div>
  );
}
