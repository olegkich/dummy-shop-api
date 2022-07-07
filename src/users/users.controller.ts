import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post('register')
  register(@Body() UserDto: UserDto) {
    return this.usersService.register(UserDto);
  }

  @UsePipes(ValidationPipe)
  @Post('login')
  login(@Body() UserDto: UserDto) {
    return this.usersService.login(UserDto);
  }
}
