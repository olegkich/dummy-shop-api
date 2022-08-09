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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Type } from 'src/models/type.model';

@ApiTags('Types')
@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @ApiOperation({ summary: 'Create a type' })
  @ApiResponse({
    status: 200,
    type: Type,
  })
  @Roles('ADMIN')
  @UseGuards(JwtRolesGuard)
  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.create(createTypeDto);
  }

  @ApiOperation({ summary: 'Fetch all existing types' })
  @ApiResponse({
    status: 200,
    type: Array<Type>,
  })
  @Get()
  findAll() {
    return this.typesService.findAll();
  }
}
