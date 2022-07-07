import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { where } from 'sequelize/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private JwtService: JwtService,
  ) {}

  async register(userDto: UserDto) {
    const candidate = await this.userRepository.findOne({
      where: { email: userDto.email },
      include: { all: true },
    });

    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword: string = await bcrypt.hash(userDto.password, 5);
    userDto.password = hashedPassword;
    const user: User = await this.userRepository.create(userDto);
    return this.generateToken(user);
  }

  async login(userDto: UserDto) {
    const candidate: User = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (!candidate) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    const isUserValid = await bcrypt.compare(
      userDto.password,
      candidate.password,
    );

    if (!isUserValid) {
      throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
    }

    return this.generateToken(candidate);
  }
  generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return this.JwtService.sign(payload);
  }
}
