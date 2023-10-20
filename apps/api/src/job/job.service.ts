import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@open-lens/nestjs-crud-typeorm';
import { JobEntity } from './job.entity';
import type { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { TagService } from '../tag/tag.service';
import { LevelService } from '../level/level.service';
import { JobTypeService } from '../job-type/job-type.service';
import { LocationService } from '../location/location.service';
import { BusinessException } from '../common/exceptions/business.exception';
import { ErrorCode } from '../common/enums/error-code.enum';
import type { TagEntity } from '../tag/tag.entity';
import type { JobTypeEntity } from '../job-type/job-type.entity';
import type { LocationEntity } from '../location/location.entity';
import type { LevelEntity } from '../level/level.entity';
import type { CurrencyEntity } from '../currency/currency.entity';
import { CurrencyService } from '../currency/currency.service';
import type { PaymentTypeEntity } from '../payment-type/payment-type.entity';
import { PaymentTypeService } from '../payment-type/payment-type.service';
import type { UpdateJobDto } from './dto/update-job.dto';
import type { CreateJobDto } from './dto/create-job.dto';
import { JobCandidateEntity } from '../job-candidate/job-candidate.entity';
import type { ApplyJobDto } from './dto/apply-job.dto';

@Injectable()
export class JobService extends TypeOrmCrudService<JobEntity> {
  constructor(
    @InjectRepository(JobEntity)
    override readonly repo: Repository<JobEntity>,
    @InjectRepository(JobCandidateEntity)
    private readonly jobCandidateRepo: Repository<JobCandidateEntity>,
    private readonly userService: UserService,
    private readonly tagService: TagService,
    private readonly levelService: LevelService,
    private readonly jobTypeService: JobTypeService,
    private readonly locationService: LocationService,
    private readonly currencyService: CurrencyService,
    private readonly paymentTypeService: PaymentTypeService
  ) {
    super(repo);
  }

  async createJob(dto: CreateJobDto, user: UserEntity, isAdmin = false) {
    const {
      tagIds,
      levelId,
      jobTypeId,
      locationId,
      currencyId,
      paymentTypeId,
      minSalary,
      maxSalary,
    } = dto;
    if (minSalary > maxSalary) {
      throw new BusinessException({
        errorCode: ErrorCode.JOB_MIN_SALARY_MUST_BE_LESS_THAN_MAX_SALARY,
        httpCode: HttpStatus.BAD_REQUEST,
      });
    }
    const userId = user.id;
    const userWithRelation = await this.userService.findOne({
      where: { id: userId },
      relations: {
        company: true,
      },
    });
    const { company = null } = userWithRelation;
    if (!isAdmin && !company) {
      throw new BusinessException({
        errorCode: ErrorCode.USER_MUST_HAVE_COMPANY_TO_CREATE_JOB,
        httpCode: HttpStatus.FORBIDDEN,
      });
    }
    const { location, jobType, tags, currency, level } =
      await this.getEssentialRelationForJob({
        tagIds,
        levelId,
        jobTypeId,
        locationId,
        currencyId,
        paymentTypeId,
      });

    return this.repo.save({
      ...dto,
      currency,
      location,
      jobType,
      tags,
      level,
      company,
      user,
    });
  }

  async updateJob(
    jobId: number,
    dto: UpdateJobDto,
    user: UserEntity,
    isAdmin = false
  ) {
    const {
      tagIds,
      levelId,
      jobTypeId,
      locationId,
      currencyId,
      paymentTypeId,
      minSalary,
      maxSalary,
      title,
      applicationTarget,
      description,
      howToApply,
      isRemote,
    } = dto;
    if (minSalary > maxSalary) {
      throw new BusinessException({
        errorCode: ErrorCode.JOB_MIN_SALARY_MUST_BE_LESS_THAN_MAX_SALARY,
        httpCode: HttpStatus.BAD_REQUEST,
      });
    }
    const userId = user.id;
    const userWithRelation = await this.userService.findOne({
      where: { id: userId },
      relations: {
        company: true,
      },
    });
    const job = await this.repo.findOne({
      where: { id: jobId, user: { id: user.id } },
    });
    if (!job) {
      throw new BusinessException({
        errorCode: ErrorCode.JOB_DOES_NOT_EXIST,
        httpCode: HttpStatus.NOT_FOUND,
      });
    }
    const { company = null } = userWithRelation;
    if (!isAdmin && !company) {
      throw new BusinessException({
        errorCode: ErrorCode.USER_MUST_HAVE_COMPANY_TO_CREATE_JOB,
        httpCode: HttpStatus.FORBIDDEN,
      });
    }
    const { location, jobType, tags, currency, level } =
      await this.getEssentialRelationForJob({
        tagIds,
        levelId,
        jobTypeId,
        locationId,
        currencyId,
        paymentTypeId,
      });

    return this.repo.save({
      isRemote,
      title,
      description,
      applicationTarget,
      howToApply,
      minSalary,
      maxSalary,
      currency,
      location,
      jobType,
      tags,
      level,
      company,
      user,
      id: jobId,
    });
  }

  private async getEssentialRelationForJob({
    tagIds,
    levelId,
    jobTypeId,
    locationId,
    currencyId,
    paymentTypeId,
  }: {
    tagIds?: number[];
    levelId?: number;
    jobTypeId?: number;
    locationId?: number;
    currencyId?: number;
    paymentTypeId?: number;
  }): Promise<{
    tags: TagEntity[] | null;
    level: LevelEntity | null;
    jobType: JobTypeEntity | null;
    location: LocationEntity | null;
    currency: CurrencyEntity | null;
    paymentType: PaymentTypeEntity | null;
  }> {
    const data = {
      tags: null,
      level: null,
      jobType: null,
      location: null,
      currency: null,
      paymentType: null,
    };

    if (tagIds?.length > 0) {
      data.tags = await this.tagService.find({ where: { id: In(tagIds) } });
      if (data.tags?.length < 1) {
        throw new BusinessException({
          errorCode: ErrorCode.TAG_DOES_NOT_EXIST,
          httpCode: HttpStatus.NOT_FOUND,
        });
      }
    }
    if (levelId) {
      data.level = await this.levelService.findOne({
        where: { id: levelId },
      });
      if (!data.level) {
        throw new BusinessException({
          errorCode: ErrorCode.LEVEL_DOES_NOT_EXIST,
          httpCode: HttpStatus.NOT_FOUND,
        });
      }
    }
    if (jobTypeId) {
      data.jobType = await this.jobTypeService.findOne({
        where: { id: jobTypeId },
      });
      if (!data.jobType) {
        throw new BusinessException({
          errorCode: ErrorCode.JOB_TYPE_DOES_NOT_EXIST,
          httpCode: HttpStatus.NOT_FOUND,
        });
      }
    }
    if (locationId) {
      data.location = await this.locationService.findOne({
        where: { id: locationId },
      });
      if (!locationId) {
        throw new BusinessException({
          errorCode: ErrorCode.LOCATION_DOES_NOT_EXIST,
          httpCode: HttpStatus.NOT_FOUND,
        });
      }
    }
    if (currencyId) {
      data.currency = await this.currencyService.findOne({
        where: { id: currencyId },
      });
      if (!data.currency) {
        throw new BusinessException({
          errorCode: ErrorCode.CURRENCY_DOES_NOT_EXIST,
          httpCode: HttpStatus.NOT_FOUND,
        });
      }
    }
    if (paymentTypeId) {
      data.paymentType = await this.paymentTypeService.findOne({
        where: { id: paymentTypeId },
      });
      if (!data.paymentType) {
        throw new BusinessException({
          errorCode: ErrorCode.PAYMENT_TYPE_DOES_NOT_EXIST,
          httpCode: HttpStatus.NOT_FOUND,
        });
      }
    }
    return { ...data };
  }

  async applyJob(id: number, dto: ApplyJobDto, user: UserEntity) {
    const job = await this.repo.findOne({ where: { id } });
    if (!job) {
      throw new BusinessException({
        errorCode: ErrorCode.JOB_DOES_NOT_EXIST,
        httpCode: HttpStatus.NOT_FOUND,
      });
    }
    return this.jobCandidateRepo.save(
      this.jobCandidateRepo.create({
        cvFileUrl: dto.cvFileUrl,
        coverLetterFileUrl: dto.coverLetterFileUrl,
        message: dto.message,
        job,
        user,
      })
    );
  }

  async getJobCandidate(user: UserEntity) {
    const { id } = user;
    const userWithRelation = await this.userService.findOne({
      where: { id: id },
      relations: {
        company: true,
      },
    });

    if (!userWithRelation.company) {
      throw new BusinessException({
        errorCode: ErrorCode.USER_MUST_HAVE_COMPANY_TO_CREATE_JOB,
        httpCode: HttpStatus.FORBIDDEN,
      });
    }

    return this.repo.find({
      where: { user: { id: id } },
      relations: ['user'],
    });
  }
}
