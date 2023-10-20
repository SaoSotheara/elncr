'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJobTypes } from '@elncr/api-service';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

function Sidebar() {
  const { data, isLoading } = useQuery({
    queryKey: ['jobTypes'],
    queryFn: getJobTypes,
  });

  const [scrollY, setScrollY] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());

  const router = useRouter();
  const pathName = usePathname();

  const [jobType, setJobType] = React.useState<number[]>(
    urlSearchParams
      .get('jobtype')
      ?.split(',')
      .map((item) => parseInt(item)) || []
  );

  const handleJobTypeChange = (event: any, checked: boolean) => {
    const value = Number(event?.target?.value);
    const JobTypeIds = checked
      ? [...jobType, value]
      : jobType.filter((v) => v !== value);
    setJobType(JobTypeIds);
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (JobTypeIds?.length === 0) {
      current.delete('jobtype');
    } else {
      current.set('jobtype', JobTypeIds.join(','));
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';
    setScrollY(window.scrollY);
    router.push(`${pathName}${query}`);
  };

  useEffect(() => {
    const persistentScroll = scrollY;
    if (persistentScroll === null) return;

    window.scrollTo({ top: Number(scrollY) });
  }, [scrollY, searchParams]);

  return (
    <aside className="mb-8 md:mb-0 md:w-64 lg:w-72 md:ml-12 lg:ml-20 md:shrink-0 md:order-1">
      <div
        data-sticky=""
        data-margin-top="32"
        data-sticky-for="768"
        data-sticky-wrap=""
      >
        <div className="relative bg-gray-50 rounded-xl border border-gray-200 p-5">
          <div className="absolute top-5 right-5 leading-none">
            <button className="text-sm font-medium text-indigo-500 hover:underline">
              Clear
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
            {/* Group 1 */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">
                Job Type
              </div>
              {isLoading ? (
                'loading...'
              ) : (
                <ul className="space-y-2">
                  {data?.map((item: { id: number; name: string }) => {
                    const checked = jobType.includes(item.id);
                    return (
                      <li key={item.id}>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            id={item.id.toString()}
                            value={item.id}
                            className="form-checkbox"
                            onChange={(e) => handleJobTypeChange(e, !checked)}
                            defaultChecked={jobType.includes(item.id)}
                          />
                          <span className="text-sm text-gray-600 ml-2">
                            {item.name}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
