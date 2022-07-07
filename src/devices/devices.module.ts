import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { Device } from 'src/models/device.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeviceInfo } from 'src/models/deviceInfo.model';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService],
  imports: [
    SequelizeModule.forFeature([Device, DeviceInfo]),
    UsersModule,
    JwtModule,
  ],
})
export class DevicesModule {}
