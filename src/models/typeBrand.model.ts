import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Brand } from './brand.model';
import { Type } from './type.model';

@Table({ tableName: 'typeBrands' })
export class TypeBrand extends Model<TypeBrand, null> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Brand)
  brandId: number;

  @ForeignKey(() => Type)
  typeId: number;
}
