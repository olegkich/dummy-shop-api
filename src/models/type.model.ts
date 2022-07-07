import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Brand } from './brand.model';
import { Device } from './device.model';
import { TypeBrand } from './typeBrand.model';

@Table({ tableName: 'types' })
export class Type extends Model<Type, null> {
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

  @BelongsToMany(() => Brand, { through: () => TypeBrand })
  brands: Brand;
}
