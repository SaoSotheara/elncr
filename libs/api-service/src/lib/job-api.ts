import { api } from './_api';
import { RequestQueryBuilder } from '@open-lens/nestjs-crud-request';

export const getJobs = async (queryParams?: any) => {
  const { queryKey } = queryParams;

  const { jobTypeParams = null, pageParam, limitParam } = queryKey[1];

  const jobTypeFilter = jobTypeParams
    ? { field: 'jobType.id', value: jobTypeParams.split(','), operator: '$in' }
    : null;

  const filter = [];
  if (jobTypeFilter) {
    filter.push(jobTypeFilter);
  }

  const params = RequestQueryBuilder.create({
    join: [
      { field: 'user' },
      { field: 'user.company' },
      { field: 'level' },
      { field: 'jobType' },
      { field: 'currency' },
      { field: 'tags' },
    ],
    sort: [{ field: 'createdAt', order: 'DESC' }],
    limit: limitParam,
    page: pageParam,
    filter,
    resetCache: true,
  }).queryObject;

  const response = await api.get(`/api/v1/job`, { params });
  return response?.data;
};

export const getJobById = async (id: number) => {
  const params = RequestQueryBuilder.create({
    join: [
      { field: 'user' },
      { field: 'user.company' },
      { field: 'level' },
      { field: 'candidates' },
      { field: 'candidates.user' },
      { field: 'jobType' },
      { field: 'currency' },
      { field: 'tags' },
    ],
    resetCache: true,
  }).queryObject;
  const response = await api.get(`/api/v1/job/${id}`, { params });
  return response?.data;
};

export const applyJob = async (id: number, data: any) => {
  const response = await api.post(`/api/v1/job/client/${id}/apply`, data);
  return response?.data;
};

export const createJob = async (data: any) => {
  const response = await api.post(`/api/v1/job/client/create`, data);
  return response?.data;
};
