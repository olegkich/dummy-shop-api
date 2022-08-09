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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Brand } from 'src/models/brand.model';
import { JwtRolesGuard } from 'src/users/jwt-roles.guard';
import { Roles } from 'src/users/roles-auth.decorator';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiOperation({ summary: 'Create a brand' })
  @ApiResponse({
    status: 200,
    type: Brand,
  })
  @Roles('ADMIN')
  @UseGuards(JwtRolesGuard)
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @ApiOperation({ summary: 'Fetch all existing brands' })
  @ApiResponse({
    status: 200,
    type: Brand,
  })
  @Get()
  findAll() {
    return this.brandsService.findAll();
  }
}
