import { RequestQueryBuilder } from '@open-lens/nestjs-crud-request';
import { api } from './_api';

export const getJobTags = async () => {
  const params = RequestQueryBuilder.create({
    join: [],
    sort: [{ field: 'name', order: 'ASC' }],
    resetCache: true,
  }).queryObject;

  const response = await api.get(`/api/v1/tag`, { params });
  return response?.data;
};
