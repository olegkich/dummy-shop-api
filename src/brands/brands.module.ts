import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { Brand } from 'src/models/brand.model';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  imports: [SequelizeModule.forFeature([Brand]), UsersModule, JwtModule],
})
export class BrandsModule {}
