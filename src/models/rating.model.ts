import {
  Column,
  DataType,
  Model,
  Table,
  HasOne,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Device } from './device.model';
import { User } from './user.model';

@Table({ tableName: 'ratings' })
export class Rating extends Model<Rating, null> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rate: number;

  @HasOne(() => User)
  user: User;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => Device)
  device: Device;

  @ForeignKey(() => Device)
  deviceId: number;
}
