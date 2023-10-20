import type { CrudController } from '@open-lens/nestjs-crud';
import { Crud, CrudActions } from '@open-lens/nestjs-crud';
import { RequiredAuth } from '../auth/decorators/required-auth.decorator';
import { CurrencyService } from './currency.service';
import { ApiResource } from '../common/decorators/api-resource.decorator';
import { CurrencyEntity } from './currency.entity';

@ApiResource(CurrencyEntity)
@Crud({
  model: {
    type: CurrencyEntity,
  },
  query: {},
  routes: {
    getOneBase: {
      decorators: [RequiredAuth(CrudActions.READ_ONE, CurrencyEntity)],
    },
    deleteOneBase: {
      decorators: [RequiredAuth(CrudActions.DELETE_ONE, CurrencyEntity)],
    },
    createManyBase: {
      decorators: [RequiredAuth(CrudActions.CREATE_MANY, CurrencyEntity)],
    },
    createOneBase: {
      decorators: [RequiredAuth(CrudActions.CREATE_ONE, CurrencyEntity)],
    },
    getManyBase: {
      decorators: [RequiredAuth(CrudActions.READ_ALL, CurrencyEntity)],
    },
    updateOneBase: {
      decorators: [RequiredAuth(CrudActions.UPDATE_ONE, CurrencyEntity)],
    },
    replaceOneBase: {
      decorators: [RequiredAuth(CrudActions.REPLACE_ONE, CurrencyEntity)],
    },
    recoverOneBase: {
      decorators: [RequiredAuth(CrudActions.RECOVER_ONE, CurrencyEntity)],
    },
  },
})
export class CurrencyController implements CrudController<CurrencyEntity> {
  constructor(readonly service: CurrencyService) {}

  get base(): CrudController<CurrencyEntity> {
    return this;
  }
}
