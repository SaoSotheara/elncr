import { TypeOrmCrudService } from '@open-lens/nestjs-crud-typeorm';
import { JobTypeEntity } from './job-type.entity';
import { Not, Repository } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { CreateJobTypeDto } from './dto/create-job-type.dto';
import type { UserEntity } from '../user/user.entity';
import { slugify } from '../common/utils/slugify.utils';
import { BusinessException } from '../common/exceptions/business.exception';
import { ErrorCode } from '../common/enums/error-code.enum';
import type { UpdateJobTypeDto } from './dto/update-job-type.dto';

@Injectable()
export class JobTypeService extends TypeOrmCrudService<JobTypeEntity> {
  constructor(
    @InjectRepository(JobTypeEntity) repo: Repository<JobTypeEntity>
  ) {
    super(repo);
  }

  async createJobType(dto: CreateJobTypeDto, user: UserEntity) {
    const { name } = dto;
    const slug = slugify(name);

    const jobTypeExist = await this.repo.findOne({ where: { slug } });
    if (jobTypeExist) {
      throw new BusinessException({
        errorCode: ErrorCode.JOB_TYPE_NAME_ALREADY_EXIST,
        httpCode: HttpStatus.CONFLICT,
      });
    }

    return this.repo.save({
      ...dto,
      slug,
      createdBy: user,
    });
  }

  async updateJobType(id: number, dto: UpdateJobTypeDto, user: UserEntity) {
    const { name } = dto;
    const slug = slugify(name);

    const jobType = await this.repo.findOne({ where: { id } });
    if (!jobType) {
      throw new BusinessException({
        errorCode: ErrorCode.JOB_TYPE_DOES_NOT_EXIST,
        httpCode: HttpStatus.NOT_FOUND,
      });
    }

    const jobTypeExist = await this.repo.findOne({
      where: { slug, id: Not(id) },
    });
    if (jobTypeExist) {
      throw new BusinessException({
        errorCode: ErrorCode.JOB_TYPE_NAME_ALREADY_EXIST,
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
