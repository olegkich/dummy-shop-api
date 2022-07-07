import { DeviceInfoType } from 'src/types';

export class CreateDeviceDto {
  name: string;
  brandId: number;
  typeId: number;
  price: number;
  img: string;
  info: string;
}
