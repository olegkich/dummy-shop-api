import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Device } from './device.model';

@Table({ tableName: 'deviceInfos' })
export class DeviceInfo extends Model<DeviceInfo, null> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsTo(() => Device)
  device: Device;

  @ForeignKey(() => Device)
  deviceId: number;
}
