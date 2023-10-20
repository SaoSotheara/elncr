import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTypeEntity } from './payment-type.entity';
import { PaymentTypeService } from './payment-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentTypeEntity])],
  providers: [PaymentTypeService],
  exports: [PaymentTypeService],
})
export class PaymentTypeModule {}
