import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { Basket } from 'src/models/basket.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { BasketDevice } from 'src/models/basketDevice.model';

@Module({
  imports: [UsersModule, SequelizeModule.forFeature([Basket, BasketDevice])],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
