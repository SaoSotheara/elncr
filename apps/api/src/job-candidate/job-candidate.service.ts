import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@open-lens/nestjs-crud-typeorm';
import { JobCandidateEntity } from './job-candidate.entity';

@Injectable()
export class JobCandidateService extends TypeOrmCrudService<JobCandidateEntity> {
  constructor(
    @InjectRepository(JobCandidateEntity)
    override readonly repo: Repository<JobCandidateEntity>
  ) {
    super(repo);
  }
}
