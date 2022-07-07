import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from 'src/models/brand.model';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand) private brandRepository: typeof Brand) {}

  create(createBrandDto: CreateBrandDto) {
    const create = this.brandRepository.create(createBrandDto);
    return create;
  }

  findAll() {
    const find = this.brandRepository.findAll();
    return find;
  }
}
