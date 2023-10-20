import { api } from './_api';

export const setupCompany = async (data: any) => {
  await api.post('api/v1/company/user-company/setup', data);
  return true;
};
