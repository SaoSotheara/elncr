import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Swagger } from '@open-lens/nestjs-crud';
import { UserEntity } from './user.entity';

export const ApiGetMeQuery = () =>
  applyDecorators(
    ...Swagger.createQueryParamsMeta('getOneBase', {
      model: {
        type: UserEntity,
      },
      query: {},
    }).map((query) => ApiQuery(query))
  );
