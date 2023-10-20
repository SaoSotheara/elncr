import { Query } from '@nestjs/common';
import { ApiExtraModels, ApiQuery } from '@nestjs/swagger';
import { PermissionEntity } from './permission.entity';
import type { CrudController } from '@open-lens/nestjs-crud';
import {
  Crud,
  Override,
  ParsedRequest,
  CrudRequest,
} from '@open-lens/nestjs-crud';
import { PermissionService } from './permission.service';
import { ApiResource } from '../common/decorators/api-resource.decorator';

@ApiResource(PermissionEntity)
// TODO Remove it after crud decorator fix `getOneBase` bug
@ApiExtraModels(PermissionEntity)
@Crud({
  model: {
    type: PermissionEntity,
  },
  query: {},
  routes: {
    only: ['getManyBase'],
  },
})
export class PermissionController implements CrudController<PermissionEntity> {
  constructor(readonly service: PermissionService) {}

  get base(): CrudController<PermissionEntity> {
    return this;
  }

  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Simple string search without syntax',
  })
  @Override('getManyBase')
  getMany(@ParsedRequest() req: CrudRequest, @Query('q') q?: string) {
    if (q) {
      req.parsed.search.$and.push({
        actionResource: {
          $contL: q,
        },
      });
    }
    return this.service.getMany(req);
  }
}
