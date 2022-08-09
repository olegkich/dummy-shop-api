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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Device } from 'src/models/device.model';
import { Helper } from 'src/shared/helper';
import { ImageType } from 'src/types';
import { JwtRolesGuard } from 'src/users/jwt-roles.guard';
import { Roles } from 'src/users/roles-auth.decorator';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { GetAllDeviesDto } from './dto/get-all-devices.dto';
@ApiTags('Devices')
@Controller('devices')
export class DevicesController {
  private image: string;

  constructor(private readonly devicesService: DevicesService) {}

  @ApiOperation({ summary: 'Create a device' })
  @ApiResponse({
    status: 200,
    type: Device,
  })
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

  // axios not does not send body with get request, hence the idiotic route
  @ApiOperation({ summary: 'Get all devices' })
  @ApiResponse({
    status: 200,
    type: Device,
  })
  @Post('get')
  async findAllButStupid(@Body() filter: GetAllDeviesDto) {
    return await this.devicesService.findAll(filter);
  }

  @ApiOperation({ summary: 'Get all devices' })
  @ApiResponse({
    status: 200,
    type: Device,
  })
  @Get()
  async findAll(@Body() filter: GetAllDeviesDto) {
    return await this.devicesService.findAll(filter);
  }

  @ApiOperation({ summary: 'Get device by id' })
  @ApiResponse({
    status: 200,
    type: Device,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(+id);
  }
}
