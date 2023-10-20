import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JobController } from './job.controller';
import { JobService } from './job.service';
import { JobEntity } from './job.entity';
import { UserModule } from '../user/user.module';
import { TagModule } from '../tag/tag.module';
import { LevelModule } from '../level/level.module';
import { JobTypeModule } from '../job-type/job-type.module';
import { LocationModule } from '../location/location.module';
import { CurrencyModule } from '../currency/currency.module';
import { PaymentTypeModule } from '../payment-type/payment-type.module';
import { JobCandidateEntity } from '../job-candidate/job-candidate.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([JobEntity, JobCandidateEntity]),
    UserModule,
    TagModule,
    LevelModule,
    JobTypeModule,
    LocationModule,
    CurrencyModule,
    PaymentTypeModule,
  ],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
