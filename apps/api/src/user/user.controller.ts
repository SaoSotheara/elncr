import {
  Body,
  Get,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import type { CrudController } from '@open-lens/nestjs-crud';
import {
  Crud,
  CrudActions,
  CrudRequest,
  CrudRequestInterceptor,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@open-lens/nestjs-crud';
import { RequiredAuth } from '../auth/decorators/required-auth.decorator';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiGetMeQuery } from './user.swagger-decorator';
import { ApiResource } from '../common/decorators/api-resource.decorator';
import { UpdateMeDto } from './dto/update-me.dto';

@ApiResource(UserEntity)
@Crud({
  model: {
    type: UserEntity,
  },
  params: {
    id: {
      type: 'string',
      primary: true,
    },
  },
  query: {
    join: {
      roles: {},
      company: {},
    },
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
    getOneBase: {
      decorators: [RequiredAuth(CrudActions.READ_ONE, UserEntity)],
    },
    deleteOneBase: {
      decorators: [RequiredAuth(CrudActions.DELETE_ONE, UserEntity)],
    },
  },
})
export class UserController implements CrudController<UserEntity> {
  constructor(readonly service: UserService) {}

  get base(): CrudController<UserEntity> {
    return this;
  }

  // @Override()
  // createOneBase(
  //   @ParsedRequest() req: CrudRequest,
  //   @ParsedBody() dto: UserEntity
  // ) {
  //   return this.service.createOne(req, dto);
  // }
  //
  // @Override()
  // @RequiredAuth(CrudActions.CREATE_ONE, UserEntity)
  // createOne(
  //   @ParsedRequest() req: CrudRequest,
  //   @ParsedBody() dto: CreateUserDto,
  //   @CurrentUser() user: UserEntity
  // ) {
  //   return this.service.create(req, dto, user);
  // }
  //
  @ApiOperation({
    summary: 'Update current user',
  })
  @RequiredAuth()
  @UsePipes(new ValidationPipe({ transform: true, always: true }))
  @UseInterceptors(CrudRequestInterceptor)
  @ApiOkResponse({ type: UserEntity })
  @Patch('me')
  async updateCurrentUser(
    @ParsedRequest() req: CrudRequest,
    @Body() dto: UpdateMeDto,
    @CurrentUser() currentUser: UserEntity
  ) {
    req.parsed.search = {
      $and: [{ id: { $eq: currentUser.id } }],
    };
    req.parsed.paramsFilter = [
      { field: 'id', operator: '$eq', value: currentUser.id },
    ];
    req.options.params = { id: { field: 'id', type: 'number', primary: true } };
    return await this.service.update(req, dto, currentUser);
  }

  @Override('updateOneBase')
  @RequiredAuth(CrudActions.UPDATE_ONE, UserEntity)
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateUserDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.service.update(req, dto, user);
  }

  @ApiOperation({
    summary: 'Get current user',
  })
  @RequiredAuth()
  @UsePipes(new ValidationPipe({ transform: true, always: true }))
  @UseInterceptors(CrudRequestInterceptor)
  @ApiGetMeQuery()
  @ApiOkResponse({ type: UserEntity })
  @Get('me')
  async getCurrentUser(
    @ParsedRequest() req: CrudRequest,
    @CurrentUser() currentUser: UserEntity
  ) {
    req.parsed.search = {
      $and: [{ id: { $eq: currentUser.id } }],
    };
    return await this.service.getOne(req);
  }
}
