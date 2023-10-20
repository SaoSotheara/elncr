import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Swagger } from '@open-lens/nestjs-crud';
import { SessionEntity } from './session.entity';

export const ApiGetMySessionQuery = () => {
  return applyDecorators(
    ...Swagger.createQueryParamsMeta('getManyBase', {
      model: {
        type: SessionEntity,
      },
      query: {},
    }).map((query) => ApiQuery(query))
  );
};
