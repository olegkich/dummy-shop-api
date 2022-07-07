import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { JwtRolesGuard } from 'src/users/jwt-roles.guard';
import { Roles } from 'src/users/roles-auth.decorator';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Roles('ADMIN')
  @UseGuards(JwtRolesGuard)
  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.create(createTypeDto);
  }

  @Get()
  findAll() {
    return this.typesService.findAll();
  }
}
