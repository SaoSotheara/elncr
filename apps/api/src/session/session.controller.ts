import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { CrudController } from '@open-lens/nestjs-crud';
import {
  Crud,
  CrudActions,
  CrudRequest,
  CrudRequestInterceptor,
  ParsedRequest,
} from '@open-lens/nestjs-crud';
import { ApiGetMySessionQuery } from './session.swagger-decorator';
import { RequiredAuth } from '../auth/decorators/required-auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../user/user.entity';
import { SessionEntity } from './session.entity';
import { SessionService } from './session.service';
import { ApiResource } from '../common/decorators/api-resource.decorator';

@ApiResource(SessionEntity)
@Crud({
  model: {
    type: SessionEntity,
  },
  query: {},
  routes: {
    exclude: [
      'replaceOneBase',
      'createManyBase',
      'updateOneBase',
      'createOneBase',
      'getOneBase',
      'deleteOneBase',
    ],
    getManyBase: {
      decorators: [RequiredAuth(CrudActions.READ_ALL, SessionEntity)],
    },
  },
})
export class SessionController implements CrudController<SessionEntity> {
  constructor(readonly service: SessionService) {}

  get base(): CrudController<SessionEntity> {
    return this;
  }

  @ApiOperation({
    summary: 'Get my sessions',
  })
  @Get('me')
  @ApiGetMySessionQuery()
  @UseInterceptors(CrudRequestInterceptor)
  @RequiredAuth()
  listMe(
    @ParsedRequest() req: CrudRequest,
    @CurrentUser() currentUser: UserEntity
  ) {
    // add strict user filter
    const { join } = req.parsed;
    const joinIncludeUser = join
      .map((joinData) => joinData.field)
      .includes('user');

    if (!joinIncludeUser) {
      req.parsed.join.push({ field: 'user' });
    }
    req.parsed.search.$and.push({ 'user.id': { $eq: currentUser.id } });
    return this.service.getMany(req);
  }
}
