import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@open-lens/nestjs-crud-typeorm';
import { PaymentTypeEntity } from './payment-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentTypeService extends TypeOrmCrudService<PaymentTypeEntity> {
  constructor(
    @InjectRepository(PaymentTypeEntity) repo: Repository<PaymentTypeEntity>
  ) {
    super(repo);
  }
}
