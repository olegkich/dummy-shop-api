import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { BasketDevice } from './basketDevice.model';
import { Brand } from './brand.model';
import { DeviceInfo } from './deviceInfo.model';
import { Rating } from './rating.model';
import { Type } from './type.model';

@Table({ tableName: 'devices' })
export class Device extends Model<Device, null> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  rating: number;

  @Column({ type: DataType.STRING, allowNull: false })
  img: string;

  @BelongsTo(() => Type)
  type: Type;

  @ForeignKey(() => Type)
  typeId: number;

  @BelongsTo(() => Brand)
  brand: Brand;

  @ForeignKey(() => Brand)
  brandId: number;

  @HasMany(() => Rating)
  ratings: Rating[];

  @HasMany(() => BasketDevice)
  basketDevices: BasketDevice[];

  @HasMany(() => DeviceInfo, { as: 'info' })
  deivceInfos: DeviceInfo[];
}
