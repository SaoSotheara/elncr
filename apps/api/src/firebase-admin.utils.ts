import { initializeApp } from 'firebase-admin/app';
import { apps } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { cert } from 'firebase-admin/app';

export const getFirebaseAdminApp = () => {
  return apps.length === 0
    ? initializeApp({
        credential: cert(
          JSON.parse(process.env.FIREBASE_ADMIN__SERVICE_ACCOUNT_JSON)
        ),
        storageBucket: process.env.FIREBASE_ADMIN__STORAGE_BUCKET_URL,
      })
    : apps[0];
};

export const getFirebaseAdminAuth = () => {
  return getAuth(getFirebaseAdminApp());
};
