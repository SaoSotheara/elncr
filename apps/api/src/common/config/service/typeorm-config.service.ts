import { Injectable } from '@nestjs/common';
import type {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';

import { SnakeNamingStrategy } from '@open-lens/typeorm-naming-strategies';
import { DatabaseConfig } from '../database.config';
import { UserEntity } from '../../../user/user.entity';
import { RoleEntity } from '../../../role/role.entity';
import { PermissionEntity } from '../../../permission/permission.entity';
import { SessionEntity } from '../../../session/session.entity';
import { ServiceEntity } from '../../../service/service.entity';
import { CategoryEntity } from '../../../category/category.entity';
import { CompanyEntity } from '../../../company/company.entity';
import { CurrencyEntity } from '../../../currency/currency.entity';
import { FeatureEntity } from '../../../feature/feature.entity';
import { JobEntity } from '../../../job/job.entity';
import { JobPostEntity } from '../../../job-post/job-post.entity';
import { JobTypeEntity } from '../../../job-type/job-type.entity';
import { LevelEntity } from '../../../level/level.entity';
import { LocationEntity } from '../../../location/location.entity';
import { MessageEntity } from '../../../message/message.entity';
import { OrderEntity } from '../../../order/order.entity';
import { PackageEntity } from '../../../package/package.entity';
import { PaymentTypeEntity } from '../../../payment-type/payment-type.entity';
import { ReviewEntity } from '../../../review/review.entity';
import { TagEntity } from '../../../tag/tag.entity';
import { UploadEntity } from '../../../upload/upload.entity';
import { JobCandidateEntity } from '../../../job-candidate/job-candidate.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly dbConfig: DatabaseConfig) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.dbConfig.url,
      namingStrategy: new SnakeNamingStrategy(),
      entities: [
        UserEntity,
        RoleEntity,
        PermissionEntity,
        SessionEntity,
        ServiceEntity,
        CategoryEntity,
        CompanyEntity,
        CurrencyEntity,
        FeatureEntity,
        JobEntity,
        JobPostEntity,
        JobTypeEntity,
        LevelEntity,
        LocationEntity,
        MessageEntity,
        OrderEntity,
        PackageEntity,
        PaymentTypeEntity,
        ReviewEntity,
        ServiceEntity,
        TagEntity,
        UploadEntity,
        JobCandidateEntity,
      ],
      logging: this.dbConfig.logging,
      synchronize: false,
    };
  }
}
