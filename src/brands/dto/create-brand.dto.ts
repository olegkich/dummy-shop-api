import { IsString } from 'class-validator';

export class CreateBrandDto {
  @IsString({ message: 'Brand name is incorrect' })
  name: string;
}
