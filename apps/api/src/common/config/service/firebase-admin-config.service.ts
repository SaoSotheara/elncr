import { Injectable } from '@nestjs/common';

import { cert } from 'firebase-admin/app';

import { FirebaseAdminConfig } from '../firebase-admin.config';
import type {
  FirebaseAdminModuleOptions,
  FirebaseAdminOptionsFactory,
} from '@open-lens/nestjs-firebase-admin';
import type { ServiceAccount } from 'firebase-admin/lib/app/credential';

@Injectable()
export class FirebaseAdminConfigService implements FirebaseAdminOptionsFactory {
  constructor(private readonly firebaseAdminConfig: FirebaseAdminConfig) {}
  createFirebaseAdminOptions():
    | Promise<FirebaseAdminModuleOptions>
    | FirebaseAdminModuleOptions {
    const serviceAccount = this.firebaseAdminConfig.serviceAccount;
    const storageBucket = this.firebaseAdminConfig.storageBucketUrl;
    return {
      credential: cert(serviceAccount as ServiceAccount),
      storageBucket,
    };
  }
}
