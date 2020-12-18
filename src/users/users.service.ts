import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { userName, email } = createUserDto;
    const user: User = new User();
    user.userName = userName;
    user.email = email;
    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return user;
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateEmailById(id: string, email: string): Promise<User> {
    const user: User = await this.userRepository.findOne(id);
    if (user) {
      user.email = email;
      await user.save();
    } else {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async deleteUserById(id: string): Promise<void> {
    const user = await this.userRepository.delete(id);
    if (user.affected == 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
