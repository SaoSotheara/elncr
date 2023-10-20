import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { TypeOrmCrudService } from '@open-lens/nestjs-crud-typeorm';

@Injectable()
export class PermissionService extends TypeOrmCrudService<PermissionEntity> {
  constructor(
    @InjectRepository(PermissionEntity)
    override readonly repo: Repository<PermissionEntity>
  ) {
    super(repo);
  }
}
