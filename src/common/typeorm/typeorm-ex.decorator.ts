// typeorm-ex.decorator.ts

import { SetMetadata } from '@nestjs/common';

export const TYPEORM_EX_ENTITY_REPOSITORY = 'TYPEORM_EX_ENTITY_REPOSITORY';

export function EntityRepository(entity: Function): ClassDecorator {
  return SetMetadata(TYPEORM_EX_ENTITY_REPOSITORY, entity);
}
