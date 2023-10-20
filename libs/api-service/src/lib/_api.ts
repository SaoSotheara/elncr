import axios from 'axios';
import { env } from './configs/envs';
import { firebaseAuth } from './configs/firebase-config';
import { getIdToken } from 'firebase/auth';
import * as AxiosLogger from 'axios-logger';

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use(async (request) => {
  const user = firebaseAuth?.currentUser;
  if (!user) {
    return request;
  }
  const token = await getIdToken(user);
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

api.interceptors.request.use(
  AxiosLogger.requestLogger as any // conflict deps with axios version
);

api.interceptors.response.use(AxiosLogger.responseLogger);
