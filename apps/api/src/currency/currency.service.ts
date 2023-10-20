import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@open-lens/nestjs-crud-typeorm';
import { CurrencyEntity } from './currency.entity';

@Injectable()
export class CurrencyService extends TypeOrmCrudService<CurrencyEntity> {
  constructor(
    @InjectRepository(CurrencyEntity)
    override readonly repo: Repository<CurrencyEntity>
  ) {
    super(repo);
  }
}
