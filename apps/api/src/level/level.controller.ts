import { Body, Param, Post, Put } from '@nestjs/common';
import type { CrudController } from '@open-lens/nestjs-crud';
import { LevelEntity } from './level.entity';
import { ApiResource } from '../common/decorators/api-resource.decorator';
import { LevelService } from './level.service';
import { Crud } from '@open-lens/nestjs-crud';
import { RequiredAuth } from '../auth/decorators/required-auth.decorator';
import { CreateLevelDto } from './dto/create-level.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../user/user.entity';
import { UpdateLevelDto } from './dto/update-level.dto';

@ApiResource(LevelEntity)
@Crud({
  model: { type: LevelEntity },
  routes: {
    getOneBase: {
      decorators: [RequiredAuth()],
    },
    getManyBase: {
      decorators: [RequiredAuth()],
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
export class LevelController implements CrudController<LevelEntity> {
  constructor(readonly service: LevelService) {}

  @Post('/admin/create')
  @RequiredAuth()
  createLevel(@Body() dto: CreateLevelDto, @CurrentUser() user: UserEntity) {
    return this.service.createLevel(dto, user);
  }

  @Put('/admin/:id')
  @RequiredAuth()
  updateLevel(
    @Param('id') id: number,
    @Body() dto: UpdateLevelDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.service.updateLevel(id, dto, user);
  }
}
