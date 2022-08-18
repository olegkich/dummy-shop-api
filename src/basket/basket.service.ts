import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from 'src/models/basket.model';
import { BasketDevice } from 'src/models/basketDevice.model';
import { Device } from 'src/models/device.model';
import { AddBasketItemDto } from './dto/add-basket-item.dto';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket) private basketRepository: typeof Basket,
    @InjectModel(BasketDevice)
    private basketDeviceRepository: typeof BasketDevice,
  ) {}
  async addItem(addBasketItemDto: AddBasketItemDto, userId: number) {
    const basket = await this.basketRepository.findOne({ where: { userId } });

    if (!basket) {
      throw new HttpException(
        'Somethings went wrong, no basket exists for this user',
        HttpStatus.NOT_FOUND,
      );
    }

    addBasketItemDto.basketId = basket.id;

    const addItem = await this.basketDeviceRepository.create({
      deviceId: addBasketItemDto.deviceId,
      basketId: addBasketItemDto.basketId,
    });

    return addItem;
  }

  async findAllItems(userId: number) {
    const basket = await this.basketRepository.findOne({ where: { userId } });
    return await this.basketDeviceRepository.findAll({
      where: { basketId: basket.id },
      include: [Device],
    });
  }

  removeItem(id: number) {
    return this.basketDeviceRepository.destroy({
      where: {
        id,
      },
    });
  }
}
