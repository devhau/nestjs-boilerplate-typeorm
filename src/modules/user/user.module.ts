import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/common/typeorm/typeorm-ex.module';

import { UserRepository } from './user.repository';
import { UsersService } from './user.service';

@Module({
  imports: [TypeOrmExModule.forRepository([UserRepository])],
  exports: [UsersService],
  providers: [UsersService],
})
export class UserModule {}
