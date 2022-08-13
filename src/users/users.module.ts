import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtRolesGuard } from './jwt-roles.guard';
import { JwtUserGuard } from './jwt-auth.guard';
import { DatabaseError } from 'sequelize/types';
import * as dotenv from 'dotenv';
import { Basket } from 'src/models/basket.model';

dotenv.config();

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Basket]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [UsersService, UsersModule, JwtModule],
})
export class UsersModule {}
