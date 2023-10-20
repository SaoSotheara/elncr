import type { CrudController } from '@open-lens/nestjs-crud';
import { Crud, CrudActions } from '@open-lens/nestjs-crud';
import { RequiredAuth } from '../auth/decorators/required-auth.decorator';
import { FeatureService } from './feature.service';
import { ApiResource } from '../common/decorators/api-resource.decorator';
import { FeatureEntity } from './feature.entity';

@ApiResource(FeatureEntity)
@Crud({
  model: {
    type: FeatureEntity,
  },
  query: {},
  routes: {
    getOneBase: {
      decorators: [RequiredAuth(CrudActions.READ_ONE, FeatureEntity)],
    },
    deleteOneBase: {
      decorators: [RequiredAuth(CrudActions.DELETE_ONE, FeatureEntity)],
    },
    createManyBase: {
      decorators: [RequiredAuth(CrudActions.CREATE_MANY, FeatureEntity)],
    },
    createOneBase: {
      decorators: [RequiredAuth(CrudActions.CREATE_ONE, FeatureEntity)],
    },
    getManyBase: {
      decorators: [RequiredAuth(CrudActions.READ_ALL, FeatureEntity)],
    },
    updateOneBase: {
      decorators: [RequiredAuth(CrudActions.UPDATE_ONE, FeatureEntity)],
    },
    replaceOneBase: {
      decorators: [RequiredAuth(CrudActions.REPLACE_ONE, FeatureEntity)],
    },
    recoverOneBase: {
      decorators: [RequiredAuth(CrudActions.RECOVER_ONE, FeatureEntity)],
    },
  },
})
export class FeatureController implements CrudController<FeatureEntity> {
  constructor(readonly service: FeatureService) {}

  get base(): CrudController<FeatureEntity> {
    return this;
  }
}
