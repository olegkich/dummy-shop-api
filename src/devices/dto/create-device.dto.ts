import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';
import { DeviceInfoType } from 'src/types';

export class CreateDeviceDto {
  @IsString()
  name: string;

  @IsInt()
  brandId: number;

  @IsInt()
  typeId: number;

  // lol
  @IsInt()
  @Max(10000000000)
  price: number;

  @IsString()
  img: string;

  @IsString()
  info: string;
}
