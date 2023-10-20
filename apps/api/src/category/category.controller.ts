import type { CrudController } from '@open-lens/nestjs-crud';
import { Crud, CrudActions } from '@open-lens/nestjs-crud';
import { RequiredAuth } from '../auth/decorators/required-auth.decorator';
import { CategoryService } from './category.service';
import { ApiResource } from '../common/decorators/api-resource.decorator';
import { CategoryEntity } from './category.entity';

@ApiResource(CategoryEntity)
@Crud({
  model: {
    type: CategoryEntity,
  },
  query: {},
  routes: {
    getOneBase: {
      decorators: [RequiredAuth(CrudActions.READ_ONE, CategoryEntity)],
    },
    deleteOneBase: {
      decorators: [RequiredAuth(CrudActions.DELETE_ONE, CategoryEntity)],
    },
    createManyBase: {
      decorators: [RequiredAuth(CrudActions.CREATE_MANY, CategoryEntity)],
    },
    createOneBase: {
      decorators: [RequiredAuth(CrudActions.CREATE_ONE, CategoryEntity)],
    },
    getManyBase: {
      decorators: [RequiredAuth(CrudActions.READ_ALL, CategoryEntity)],
    },
    updateOneBase: {
      decorators: [RequiredAuth(CrudActions.UPDATE_ONE, CategoryEntity)],
    },
    replaceOneBase: {
      decorators: [RequiredAuth(CrudActions.REPLACE_ONE, CategoryEntity)],
    },
    recoverOneBase: {
      decorators: [RequiredAuth(CrudActions.RECOVER_ONE, CategoryEntity)],
    },
  },
})
export class CategoryController implements CrudController<CategoryEntity> {
  constructor(readonly service: CategoryService) {}

  get base(): CrudController<CategoryEntity> {
    return this;
  }
}
