import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from './level.entity';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LevelEntity])],
  controllers: [LevelController],
  providers: [LevelService],
  exports: [LevelService],
})
export class LevelModule {}
