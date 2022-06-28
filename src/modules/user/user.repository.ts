import { EntityRepository } from 'src/common/typeorm/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
