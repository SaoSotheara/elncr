import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@open-lens/nestjs-crud-typeorm';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService extends TypeOrmCrudService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    override readonly repo: Repository<CategoryEntity>
  ) {
    super(repo);
  }
}
