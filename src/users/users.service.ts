import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
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

  // loggedIn(req) {
  //   if (!req.user) {
  //     return 'No user from google';
  //   }

  //   return {
  //     message: 'User information from google',
  //     user: req.user.name,
  //   };
  // }

  async signIn(req): Promise<User> {
    if (!req.user) {
      throw new NotFoundException('User not found');
    } 
    const user: User = new User();
    user.userName = req.user.name;
    user.email = req.user.email;
    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return user;
  }
}
