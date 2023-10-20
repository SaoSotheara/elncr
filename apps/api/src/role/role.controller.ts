import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { CrudController } from '@open-lens/nestjs-crud';
import {
  Crud,
  CrudActions,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@open-lens/nestjs-crud';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';
import { RequiredAuth } from '../auth/decorators/required-auth.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { UserEntity } from '../user/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiResource } from '../common/decorators/api-resource.decorator';

@ApiResource(RoleEntity)
@Crud({
  model: {
    type: RoleEntity,
  },
  query: {},
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
    getOneBase: {
      decorators: [RequiredAuth(CrudActions.READ_ONE, RoleEntity)],
    },
    deleteOneBase: {
      decorators: [RequiredAuth(CrudActions.DELETE_ONE, RoleEntity)],
    },
  },
})
export class RoleController implements CrudController<RoleEntity> {
  constructor(readonly service: RoleService) {}

  get base(): CrudController<RoleEntity> {
    return this;
  }

  @Override('createOneBase')
  @RequiredAuth(CrudActions.CREATE_ONE, RoleEntity)
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateRoleDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.service.create(req, dto, user);
  }

  @Override('updateOneBase')
  @RequiredAuth(CrudActions.UPDATE_ONE, RoleEntity)
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateRoleDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.service.update(req, dto, user);
  }
}
