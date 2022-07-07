import { Inject, Injectable, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UUIDV4 } from 'sequelize';
import { Device } from 'src/models/device.model';
import { DeviceInfo } from 'src/models/deviceInfo.model';
import { Helper } from 'src/shared/helper';
import { DeviceInfoType, DeviceType } from 'src/types';

import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device) private deviceRepository: typeof Device,
    @InjectModel(DeviceInfo) private infoRepository: typeof DeviceInfo,
  ) {}

  async create(createDeviceDto: CreateDeviceDto) {
    const device: DeviceType = {
      name: createDeviceDto.name,
      price: createDeviceDto.price,
      img: createDeviceDto.img,
      typeId: createDeviceDto.typeId,
      brandId: createDeviceDto.brandId,
    };

    const deviceInfo: Array<DeviceInfoType> = JSON.parse(createDeviceDto.info);

    const create = await this.deviceRepository.create(device);

    if (deviceInfo) {
      console.log(deviceInfo, typeof deviceInfo);

      deviceInfo.forEach((info) => {
        this.infoRepository.create({
          title: info.title,
          description: info.description,
          deviceId: create.id,
        });
      });
    }
  }

  findAll() {
    return `This action returns all devices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} device`;
  }
}
