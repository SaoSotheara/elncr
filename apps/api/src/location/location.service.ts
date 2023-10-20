import { TypeOrmCrudService } from '@open-lens/nestjs-crud-typeorm';
import { LocationEntity } from './location.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationService extends TypeOrmCrudService<LocationEntity> {
  constructor(
    @InjectRepository(LocationEntity) repo: Repository<LocationEntity>
  ) {
    super(repo);
  }
}
