import { PaymentTypeService } from './payment-type.service';
import type { CrudController } from '@open-lens/nestjs-crud';
import { Crud } from '@open-lens/nestjs-crud';
import { PaymentTypeEntity } from './payment-type.entity';
import { ApiResource } from '../common/decorators/api-resource.decorator';

@ApiResource(PaymentTypeEntity)
@Crud({
  model: { type: PaymentTypeEntity },
  routes: {
    getOneBase: {
      decorators: [],
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
export class PaymentTypeController
  implements CrudController<PaymentTypeEntity>
{
  constructor(public service: PaymentTypeService) {}
}
