import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Basket } from './basket.model';
import { Device } from './device.model';

@Table({ tableName: 'basketDevices' })
export class BasketDevice extends Model<BasketDevice, null> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @BelongsTo(() => Basket)
  basket: Basket;

  @ForeignKey(() => Basket)
  baksetId: number;

  @BelongsTo(() => Device)
  device: Device;

  @ForeignKey(() => Device)
  deviceId: number;
}
