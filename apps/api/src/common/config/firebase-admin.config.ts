import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { TransformJson } from '../decorators/transform/transform-json.decorator';
import { Expose } from 'class-transformer';

export class FirebaseAdminConfig {
  @TransformJson()
  @IsObject()
  @Expose({ name: 'SERVICE_ACCOUNT_JSON' })
  readonly serviceAccount: {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    universe_domain: string;
  };

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'STORAGE_BUCKET_URL' })
  readonly storageBucketUrl: string;
}
