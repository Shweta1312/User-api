import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    const user = new User();
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
    const user = this.userRepository.find();
    return user;
  }

  async updateEmailById(id: string, email: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    user.email = email;
    await user.save();
    return user;
  }
}
