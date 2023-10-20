import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { env } from './envs';

export const firebaseConfig = env.NEXT_PUBLIC_FIREBASE_CONFIG;

export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
