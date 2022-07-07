import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { Type } from 'src/models/type.model';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TypesController],
  providers: [TypesService],
  imports: [SequelizeModule.forFeature([Type]), UsersModule, JwtModule],
})
export class TypesModule {}
