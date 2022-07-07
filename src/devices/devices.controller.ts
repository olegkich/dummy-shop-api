import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from 'src/shared/helper';
import { ImageType } from 'src/types';
import { JwtRolesGuard } from 'src/users/jwt-roles.guard';
import { Roles } from 'src/users/roles-auth.decorator';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { GetAllDeviesDto } from './dto/get-all-devices.dto';

@Controller('devices')
export class DevicesController {
  private image: string;

  constructor(private readonly devicesService: DevicesService) {}

  @Roles('ADMIN')
  @UseGuards(JwtRolesGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
    }),
  )
  create(
    @Body() createDeviceDto: CreateDeviceDto,
    @UploadedFile() img: ImageType,
  ) {
    createDeviceDto.img = img.filename;

    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  findAll(@Body() filter: GetAllDeviesDto) {
    return this.devicesService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(+id);
  }
}
