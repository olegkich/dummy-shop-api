import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { User } from 'src/shared/user-auth.decorator';
import { JwtUserGuard } from 'src/users/jwt-auth.guard';
import { JwtRolesGuard } from 'src/users/jwt-roles.guard';
import { Roles } from 'src/users/roles-auth.decorator';
import { BasketService } from './basket.service';
import { AddBasketItemDto } from './dto/add-basket-item.dto';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @UseGuards(JwtUserGuard)
  @Post()
  addItem(@Body() addBasketItemDto: AddBasketItemDto, @User() user: any) {
    return this.basketService.addItem(addBasketItemDto, user.id);
  }

  @UseGuards(JwtUserGuard)
  @Get()
  findAll(@User() user: any) {
    return this.basketService.findAllItems(user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketService.removeItem(+id);
  }
}
