import { Injectable, NotAcceptableException } from '@nestjs/common';
import { createHmac } from 'crypto';

import { Roles } from '../../common/decorators/roles.decorator';
import { UserFillableFields } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
@Roles('admin') // TODO: Add 'authenticatedUser'
export class UsersService {
  constructor(private readonly userRepository: UserRepository) { }
  async test() {
    return await this.userRepository.find();
  }
  async get(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getByEmailAndPass(email: string, password: string) {
    const passHash = createHmac('sha256', password).digest('hex');
    return await this.userRepository.findOne({ where: { email, password: passHash } });
  }

  async create(payload: UserFillableFields) {
    const checkUserExistence = await this.getByEmail(payload.email);

    if (checkUserExistence) {
      throw new NotAcceptableException(
        'Another user with provided email already exists.',
      );
    }

    const newUser = this.userRepository.create(payload);
    return await this.userRepository.save(newUser);
  }
}
