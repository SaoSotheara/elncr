import type { CrudController } from '@open-lens/nestjs-crud';
import { JobTypeEntity } from './job-type.entity';
import { JobTypeService } from './job-type.service';
import { ApiResource } from '../common/decorators/api-resource.decorator';
import { RequiredAuth } from '../auth/decorators/required-auth.decorator';
import { Crud } from '@open-lens/nestjs-crud';
import { Body, Param, Post, Put } from '@nestjs/common';
import { CreateJobTypeDto } from './dto/create-job-type.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../user/user.entity';
import { UpdateJobTypeDto } from './dto/update-job-type.dto';

@ApiResource(JobTypeEntity)
@Crud({
  model: { type: JobTypeEntity },
  routes: {
    getOneBase: {
      decorators: [RequiredAuth()],
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
export class JobTypeController implements CrudController<JobTypeEntity> {
  constructor(public service: JobTypeService) {}

  get base(): CrudController<JobTypeEntity> {
    return this;
  }

  @Post('/admin/create')
  @RequiredAuth()
  createJobType(
    @Body() dto: CreateJobTypeDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.service.createJobType(dto, user);
  }

  @Put('/admin/update/:id')
  @RequiredAuth()
  updateJobType(
    @Param('id') id: number,
    @Body() dto: UpdateJobTypeDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.service.updateJobType(id, dto, user);
  }
}
