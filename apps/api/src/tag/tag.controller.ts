import type { CrudController } from '@open-lens/nestjs-crud';
import { Crud, CrudActions } from '@open-lens/nestjs-crud';
import { RequiredAuth } from '../auth/decorators/required-auth.decorator';
import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';
import { ApiResource } from '../common/decorators/api-resource.decorator';

@ApiResource(TagEntity)
@Crud({
  model: {
    type: TagEntity,
  },
  query: {},
  routes: {
    getOneBase: {
      decorators: [RequiredAuth(CrudActions.READ_ONE, TagEntity)],
    },
    deleteOneBase: {
      decorators: [RequiredAuth(CrudActions.DELETE_ONE, TagEntity)],
    },
    createManyBase: {
      decorators: [RequiredAuth(CrudActions.CREATE_MANY, TagEntity)],
    },
    createOneBase: {
      decorators: [RequiredAuth(CrudActions.CREATE_ONE, TagEntity)],
    },
    getManyBase: {
      decorators: [],
    },
    updateOneBase: {
      decorators: [RequiredAuth(CrudActions.UPDATE_ONE, TagEntity)],
    },
    replaceOneBase: {
      decorators: [RequiredAuth(CrudActions.REPLACE_ONE, TagEntity)],
    },
    recoverOneBase: {
      decorators: [RequiredAuth(CrudActions.RECOVER_ONE, TagEntity)],
    },
  },
})
export class TagController implements CrudController<TagEntity> {
  constructor(readonly service: TagService) {}

  get base(): CrudController<TagEntity> {
    return this;
  }
}
