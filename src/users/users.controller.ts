import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Patch('/:id')
  updateEmailById(
    @Param('id') id: string,
    @Body('email') email: string,
  ): Promise<User> {
    return this.usersService.updateEmailById(id, email);
  }

  @Delete('/:id')
  deleteUserById(@Param('id') id: string): void {
    this.usersService.deleteUserById(id);
  }

  // @Get('/redire')
  // googleAuthRedirect(@Req() req){
  //   return this.usersService.loggedIn(req);
  // }

  @UseGuards(AuthGuard('google'))
  @Get('/signin')
  googleSignIn(@Req() req): Promise<User> {
    return this.usersService.signIn(req);
  }
}
