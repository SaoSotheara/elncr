'use client';

import React from 'react';

import Image06 from '../images/company-icon-06.svg';

import dayjs from 'dayjs';
import { api, useCurrentUserQuery } from '@elncr/api-service';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import JobItemForUser from './JobItemForUser';

function JobListForUser() {
  const { user, isLoading: isLoadingUser } = useCurrentUserQuery();

  const { data, isLoading } = useQuery({
    queryKey: ['job-list-for-user'],
    queryFn: () =>
      api.get('/api/v1/jobcandidate/company-job').then((res) => res.data),
    enabled: !!user,
  });

  const router = useRouter();

  if (isLoadingUser || isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/sign-in?redirect=/candidate');
  }

  return (
    <div className="pb-8 md:pb-16">
      <h2 className="text-3xl font-bold font-inter mb-10">All applied jobs</h2>
      {/* List container */}
      <div className="grid grid-cols-3">
        {data?.map((item: any) => {
          return (
            <JobItemForUser
              key={item.id}
              id={item.id}
              sticky={false}
              title={item.title}
              name={item.user?.company?.name}
              image={
                item.user?.company?.image ? item.user?.company?.image : Image06
              }
              tags={item.tags}
              date={dayjs(item.createdAt).format('DD MMM YYYY')}
            />
          );
        })}
      </div>
    </div>
  );
}

export default JobListForUser;
