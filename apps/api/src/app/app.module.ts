import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dotenvLoader, TypedConfigModule } from 'nest-typed-config';
import { TypeOrmConfigService } from '../common/config/service/typeorm-config.service';
import { RootConfig } from '../common/config/root.config';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { PermissionModule } from '../permission/permission.module';
import { FirebaseAdminModule } from '@open-lens/nestjs-firebase-admin';
import { FirebaseAdminConfigService } from '../common/config/service/firebase-admin-config.service';
import { TagModule } from '../tag/tag.module';
import { CategoryModule } from '../category/category.module';
import { CompanyModule } from '../company/company.module';
import { CurrencyModule } from '../currency/currency.module';
import { FeatureModule } from '../feature/feature.module';
import { JobModule } from '../job/job.module';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { JobCandidateEntity } from '../job-candidate/job-candidate.entity';
import { JobCandidateModule } from '../job-candidate/job-candidate.module';

@Module({
  imports: [
    TypedConfigModule.forRoot({
      schema: RootConfig,
      load: dotenvLoader({
        envFilePath: '.env.local',
        separator: '__',
      }),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    FirebaseAdminModule.forRootAsync({
      useClass: FirebaseAdminConfigService,
    }),
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    TagModule,
    CategoryModule,
    CompanyModule,
    CurrencyModule,
    FeatureModule,
    JobModule,
    FileUploadModule,
    JobCandidateModule,
  ],
})
export class AppModule {}
