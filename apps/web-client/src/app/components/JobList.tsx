'use client';

import React from 'react';

import JobItem from '../components/JobItem';

import Image06 from '../images/company-icon-06.svg';

import dayjs from 'dayjs';
import { getJobs } from '@elncr/api-service';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import Pagination from './Pagination';

function JobList() {
  const searchParams = useSearchParams();
  const jobTypeParams = searchParams.get('jobtype');
  const pageParam: number =
    searchParams.get('page') && Number(searchParams.get('page')) > 0
      ? Number(searchParams.get('page'))
      : 1;
  const limitParam =
    searchParams.get('limit') && Number(searchParams.get('limit')) > 0
      ? Number(searchParams.get('limit'))
      : 10;

  const { data, isLoading } = useQuery({
    queryKey: ['latestJob', { jobTypeParams, pageParam, limitParam }],
    queryFn: getJobs,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pb-8 md:pb-16">
      <h2 className="text-3xl font-bold font-inter mb-10">Latest jobs</h2>
      {/* List container */}
      <div className="flex flex-col">
        {data?.data?.map((item: any) => {
          return (
            <JobItem
              key={item.id}
              id={item.id}
              sticky={false}
              title={item.title}
              name={item.user.company.name}
              image={
                item.user.company.image ? item.user.company.image : Image06
              }
              tags={item.tags}
              date={dayjs(item.createdAt).format('DD MMM YYYY')}
            />
          );
        })}

        <div className="py-8  border-gray-200 -order-1">
          <Pagination
            items={data.data}
            totalItems={data.total}
            itemsPerPage={limitParam}
          />
        </div>
      </div>
    </div>
  );
}

export default JobList;
