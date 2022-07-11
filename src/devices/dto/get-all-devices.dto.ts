import { IsInt } from 'class-validator';

export class GetAllDeviesDto {
  @IsInt()
  brandId: number;

  @IsInt()
  typeId: number;

  @IsInt()
  limit: number;

  @IsInt()
  page: number;
}
