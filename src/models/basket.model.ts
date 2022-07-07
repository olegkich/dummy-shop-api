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
import { User } from './user.model';

@Table({ tableName: 'baskets' })
export class Basket extends Model<Basket, null> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  userId: number;

  @HasMany(() => BasketDevice)
  basketDevices: BasketDevice[];
}
