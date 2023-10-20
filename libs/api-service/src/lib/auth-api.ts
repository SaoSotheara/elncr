import { api } from './_api';

export const completeSignUp = async () => {
  const response = await api.post('api/v1/auth/complete-sign-up');
  return response.data;
};
