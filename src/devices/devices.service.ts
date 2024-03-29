import { Inject, Injectable, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { info } from 'console';
import { json, UUIDV4 } from 'sequelize';
import { Brand } from 'src/models/brand.model';
import { Device } from 'src/models/device.model';
import { DeviceInfo } from 'src/models/deviceInfo.model';
import { Type } from 'src/models/type.model';
import { Helper } from 'src/shared/helper';
import { DeviceInfoType, DeviceType } from 'src/types';

import { CreateDeviceDto } from './dto/create-device.dto';
import { GetAllDeviesDto } from './dto/get-all-devices.dto';

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
      img: createDeviceDto.image,
      typeId: createDeviceDto.typeId,
      brandId: createDeviceDto.brandId,
    };

    // TODO: Validation for the maximum number of items in info array
    const deviceInfo: Array<DeviceInfoType | undefined> = JSON.parse(
      createDeviceDto.info,
    );

    const create = await this.deviceRepository.create(device);

    if (deviceInfo) {
      console.log(deviceInfo, 'device info');
      deviceInfo.forEach((info) => {
        this.infoRepository.create({
          title: info.title,
          description: info.description,
          deviceId: create.id,
        });
      });
    }
  }

  async findAll(filter: GetAllDeviesDto) {
    let limit = filter.limit || 9;
    let page = filter.page || 1;

    let offset = page * limit - limit;

    if (filter.brandId && filter.typeId) {
      return await this.deviceRepository.findAndCountAll({
        where: { brandId: filter.brandId, typeId: filter.typeId },
        include: [Type, Brand],
        limit,

        offset,
      });
    }
    if (filter.brandId) {
      return await this.deviceRepository.findAndCountAll({
        where: { brandId: filter.brandId },
        include: [Type, Brand],
        limit,
        offset,
      });
    }

    if (filter.typeId) {
      return await this.deviceRepository.findAndCountAll({
        where: { typeId: filter.typeId },
        include: [Type, Brand],
        limit,
        offset,
      });
    }

    return await this.deviceRepository.findAndCountAll({ where: {}, limit });
  }

  findOne(id: number) {
    console.log(id);
    return this.deviceRepository.findOne({
      where: { id },
      include: [Type, Brand, DeviceInfo],
    });
  }
}
