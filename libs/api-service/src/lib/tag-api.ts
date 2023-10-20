import { RequestQueryBuilder } from '@open-lens/nestjs-crud-request';
import { api } from './_api';

export const getJobTypes = async () => {
  const params = RequestQueryBuilder.create({
    join: [],
    sort: [{ field: 'name', order: 'ASC' }],
    resetCache: true,
  }).queryObject;

  const response = await api.get(`/api/v1/jobtype`, { params });
  return response?.data;
};
