import type { CrudController } from '@open-lens/nestjs-crud';
import { Crud, CrudActions } from '@open-lens/nestjs-crud';
import { RequiredAuth } from '../auth/decorators/required-auth.decorator';
import { JobService } from './job.service';
import { ApiResource } from '../common/decorators/api-resource.decorator';
import { JobEntity } from './job.entity';
import { Body, Param, Post, Put } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../user/user.entity';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApplyJobDto } from './dto/apply-job.dto';

@ApiResource(JobEntity)
@Crud({
  model: {
    type: JobEntity,
  },
  query: {
    join: {
      user: {},
      'user.company': {},
      level: {},
      jobType: {},
      currency: {},
      location: {},
      paymentType: {},
      tags: {},
      candidates: {},
      'candidates.user': {
        alias: 'job_candidate_user',
      },
    },
  },
  routes: {
    getOneBase: {
      decorators: [RequiredAuth(CrudActions.READ_ONE, JobEntity)],
    },
    deleteOneBase: {
      decorators: [RequiredAuth(CrudActions.DELETE_ONE, JobEntity)],
    },
    getManyBase: {
      decorators: [],
    },
    exclude: [
      'createOneBase',
      'createManyBase',
      'updateOneBase',
      'replaceOneBase',
      'recoverOneBase',
    ],
  },
})
export class JobController implements CrudController<JobEntity> {
  constructor(readonly service: JobService) {}

  get base(): CrudController<JobEntity> {
    return this;
  }

  @Post('/client/create')
  @RequiredAuth()
  createClientJob(@Body() dto: CreateJobDto, @CurrentUser() user: UserEntity) {
    return this.service.createJob(dto, user, false);
  }

  @Post('/admin/create')
  @RequiredAuth()
  createAdminJob(@Body() dto: CreateJobDto, @CurrentUser() user: UserEntity) {
    return this.service.createJob(dto, user, true);
  }

  @Put('/client/:id')
  @RequiredAuth()
  updateClientJob(
    @Param('id') id: number,
    @Body() dto: UpdateJobDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.service.updateJob(id, dto, user, false);
  }

  @Post('/client/:id/apply')
  @RequiredAuth()
  applyJob(
    @Param('id') id: number,
    @Body() dto: ApplyJobDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.service.applyJob(id, dto, user);
  }

  @Put('/admin/:id')
  @RequiredAuth()
  updateAdminJob(
    @Param('id') id: number,
    @Body() dto: UpdateJobDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.service.updateJob(id, dto, user, true);
  }
}
