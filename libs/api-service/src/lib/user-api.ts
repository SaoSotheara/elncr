import { api } from './_api';
import type { User } from './typings/user';
import { RequestQueryBuilder } from '@open-lens/nestjs-crud-request';

export const getMe = async () => {
  const params = RequestQueryBuilder.create({
    // fields: ['name', 'email'],
    // search: { isActive: true },
    join: [{ field: 'roles' }, { field: 'company' }],
    // sort: [{ field: 'id', order: 'DESC' }],
    // page: 1,
    // limit: 25,
    resetCache: true,
  }).queryObject;
  const response = await api.get<User>('api/v1/user/me', {
    params: params,
  });
  return response.data;
};

export const updateMe = async (data: Partial<User>) => {
  const response = await api.patch<User>('api/v1/user/me', data);
  return response.data;
};
