import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@open-lens/nestjs-crud-typeorm';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService extends TypeOrmCrudService<TagEntity> {
  constructor(
    @InjectRepository(TagEntity)
    override readonly repo: Repository<TagEntity>
  ) {
    super(repo);
  }
}
