import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Type } from 'src/models/type.model';
import { CreateTypeDto } from './dto/create-type.dto';

@Injectable()
export class TypesService {
  constructor(@InjectModel(Type) private typeRepository: typeof Type) {}

  async create(createTypeDto: CreateTypeDto) {
    const create = await this.typeRepository.create(createTypeDto);
    return create;
  }

  async findAll() {
    const find = await this.typeRepository.findAll();
    return find;
  }
}
