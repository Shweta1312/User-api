import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { userName, email } = createUserDto;
    const user: User = new User();
    user.userName = userName;
    user.email = email;
    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return user;
  }
}
