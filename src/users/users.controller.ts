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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/models/user.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Register a user' })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @UsePipes(ValidationPipe)
  @Post('register')
  register(@Body() UserDto: UserDto) {
    return this.usersService.register(UserDto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @UsePipes(ValidationPipe)
  @Post('login')
  login(@Body() UserDto: UserDto) {
    return this.usersService.login(UserDto);
  }
}
