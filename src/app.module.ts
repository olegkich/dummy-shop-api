import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from './users/users.module';
import { TypesModule } from './types/types.module';
import { DevicesModule } from './devices/devices.module';
import { BrandsModule } from './brands/brands.module';

import { Basket } from './models/basket.model';
import { BasketDevice } from './models/basketDevice.model';
import { User } from './models/user.model';
import { Brand } from './models/brand.model';
import { DeviceInfo } from './models/deviceInfo.model';
import { Rating } from './models/rating.model';
import { TypeBrand } from './models/typeBrand.model';
import { Type } from './models/type.model';
import { Device } from './models/device.model';
import { UsersService } from './users/users.service';
import * as dotenv from 'dotenv';

@Module({
  imports: [
    UsersModule,
    TypesModule,
    DevicesModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Basket,
        BasketDevice,
        Brand,
        DeviceInfo,
        Rating,
        TypeBrand,
        Type,
        Device,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    BrandsModule,
    TypesModule,
    DevicesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
