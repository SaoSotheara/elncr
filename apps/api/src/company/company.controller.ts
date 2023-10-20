import type { CrudController } from '@open-lens/nestjs-crud';
import { Crud, CrudActions } from '@open-lens/nestjs-crud';
import { RequiredAuth } from '../auth/decorators/required-auth.decorator';
import { CompanyService } from './company.service';
import { ApiResource } from '../common/decorators/api-resource.decorator';
import { CompanyEntity } from './company.entity';
import { CreateUserCompanyDto } from './dto/create-user-company.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Body, Param, Post, Put } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { UpdateUserCompanyDto } from './dto/update-user-company.dto';

@ApiResource(CompanyEntity)
@Crud({
  model: {
    type: CompanyEntity,
  },
  query: {
    join: {
      job: {},
      'job.candidates': {},
    },
  },
  routes: {
    getOneBase: {
      decorators: [RequiredAuth(CrudActions.READ_ONE, CompanyEntity)],
    },
    deleteOneBase: {
      decorators: [RequiredAuth(CrudActions.DELETE_ONE, CompanyEntity)],
    },
    createManyBase: {
      decorators: [RequiredAuth(CrudActions.CREATE_MANY, CompanyEntity)],
    },
    createOneBase: {
      decorators: [RequiredAuth(CrudActions.CREATE_ONE, CompanyEntity)],
    },
    getManyBase: {
      decorators: [RequiredAuth(CrudActions.READ_ALL, CompanyEntity)],
    },
    updateOneBase: {
      decorators: [RequiredAuth(CrudActions.UPDATE_ONE, CompanyEntity)],
    },
    replaceOneBase: {
      decorators: [RequiredAuth(CrudActions.REPLACE_ONE, CompanyEntity)],
    },
    recoverOneBase: {
      decorators: [RequiredAuth(CrudActions.RECOVER_ONE, CompanyEntity)],
    },
  },
})
export class CompanyController implements CrudController<CompanyEntity> {
  constructor(readonly service: CompanyService) {}

  get base(): CrudController<CompanyEntity> {
    return this;
  }

  @Post('/user-company/setup')
  @RequiredAuth()
  createUserCompany(
    @Body() dto: CreateUserCompanyDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.service.createUserCompany(dto, user);
  }

  @Put('/user-company/update/:id')
  @RequiredAuth()
  updateUserCompany(
    @Param('id') id: number,
    @Body() dto: UpdateUserCompanyDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.service.updateUserCompany(id, dto, user);
  }
}
