import { TypeOrmCrudService } from '@open-lens/nestjs-crud-typeorm';
import { LevelEntity } from './level.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import type { UserEntity } from '../user/user.entity';
import { slugify } from '../common/utils/slugify.utils';
import { BusinessException } from '../common/exceptions/business.exception';
import { ErrorCode } from '../common/enums/error-code.enum';
import type { CreateLevelDto } from './dto/create-level.dto';
import type { UpdateLevelDto } from './dto/update-level.dto';

@Injectable()
export class LevelService extends TypeOrmCrudService<LevelEntity> {
  constructor(@InjectRepository(LevelEntity) repo: Repository<LevelEntity>) {
    super(repo);
  }

  async createLevel(dto: CreateLevelDto, user: UserEntity) {
    const { name } = dto;
    const slug = slugify(name);

    const levelExist = await this.repo.findOne({ where: { slug } });
    if (levelExist) {
      throw new BusinessException({
        errorCode: ErrorCode.LEVEL_NAME_ALREADY_EXIST,
        httpCode: HttpStatus.CONFLICT,
      });
    }

    return this.repo.save({
      ...dto,
      slug,
      createdBy: user,
    });
  }

  async updateLevel(id: number, dto: UpdateLevelDto, user: UserEntity) {
    const { name } = dto;
    const slug = slugify(name);

    const level = await this.repo.findOne({ where: { id } });
    if (!level) {
      throw new BusinessException({
        errorCode: ErrorCode.LEVEL_DOES_NOT_EXIST,
        httpCode: HttpStatus.NOT_FOUND,
      });
    }

    const levelExist = await this.repo.findOne({
      where: { slug, id: Not(id) },
    });
    if (levelExist) {
      throw new BusinessException({
        errorCode: ErrorCode.LEVEL_NAME_ALREADY_EXIST,
        httpCode: HttpStatus.CONFLICT,
      });
    }

    return this.repo.update(id, {
      ...dto,
      slug,
      updatedBy: user,
    });
  }
}
