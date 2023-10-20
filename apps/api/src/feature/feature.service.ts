import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@open-lens/nestjs-crud-typeorm';
import { FeatureEntity } from './feature.entity';

@Injectable()
export class FeatureService extends TypeOrmCrudService<FeatureEntity> {
  constructor(
    @InjectRepository(FeatureEntity)
    override readonly repo: Repository<FeatureEntity>
  ) {
    super(repo);
  }
}
