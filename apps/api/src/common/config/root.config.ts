import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TransformNumber } from '../decorators/transform/transform-number.decorator';
import { DatabaseConfig } from './database.config';
import { FirebaseAdminConfig } from './firebase-admin.config';
import { TransformBoolean } from '../decorators/transform/transform-boolean.decorator';

export class RootConfig {
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'HOST' })
  readonly host: string;

  @IsNotEmpty()
  @TransformNumber()
  @IsNumber()
  @Expose({ name: 'PORT' })
  readonly port: number;

  @IsString()
  @IsOptional()
  @Expose({ name: 'BASE_URL' })
  readonly baseUrl: string;

  get url(): string {
    if (this.baseUrl) {
      return this.baseUrl;
    }
    return `${this.host}:${this.port}`;
  }

  @IsString()
  @IsOptional()
  readonly NODE_ENV = 'development';

  get isDev(): boolean {
    return this.NODE_ENV === 'development';
  }

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'SERVER_API_KEY' })
  readonly serverApiKey: string;

  @IsBoolean()
  @IsNotEmpty()
  @TransformBoolean()
  @Expose({ name: 'ENABLE_SWAGGER' })
  readonly enableSwagger: boolean;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'SENTRY_DSN' })
  readonly sentryDsn: string;

  @ValidateNested()
  @Type(() => FirebaseAdminConfig)
  @IsNotEmpty()
  @Expose({ name: 'FIREBASE_ADMIN' })
  readonly firebaseAdmin: FirebaseAdminConfig;

  @ValidateNested()
  @Type(() => DatabaseConfig)
  @IsNotEmpty()
  @Expose({ name: 'DB' })
  readonly db: DatabaseConfig;
}
