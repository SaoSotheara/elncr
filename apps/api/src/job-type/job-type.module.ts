import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobTypeEntity } from './job-type.entity';
import { JobTypeService } from './job-type.service';
import { JobTypeController } from './job-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JobTypeEntity])],
  controllers: [JobTypeController],
  providers: [JobTypeService],
  exports: [JobTypeService],
})
export class JobTypeModule {}
