import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Device } from './device.model';
import { Type } from './type.model';
import { TypeBrand } from './typeBrand.model';
import { User } from './user.model';

@Table({ tableName: 'brands' })
export class Brand extends Model<Brand, null> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => Device)
  devices: Device[];

  @BelongsToMany(() => Type, { through: () => TypeBrand })
  types: Type[];
}
