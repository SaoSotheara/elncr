import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobCandidateEntity } from './job-candidate.entity';
import { JobCandidateService } from './job-candidate.service';
import { PermissionEntity } from '../permission/permission.entity';
import { JobCandidateController } from './job-candidate.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([JobCandidateEntity, PermissionEntity])],
  controllers: [JobCandidateController],
  providers: [JobCandidateService],
  exports: [],
})
export class JobCandidateModule {}
