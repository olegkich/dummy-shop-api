import {
  Column,
  DataType,
  Model,
  Table,
  HasOne,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';

import { Basket } from './basket.model';
import { BasketDevice } from './basketDevice.model';
import { Brand } from './brand.model';
import { Device } from './device.model';
import { DeviceInfo } from './deviceInfo.model';
import { Rating } from './rating.model';
import { Type } from './type.model';
import { TypeBrand } from './typeBrand.model';

interface IUserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, defaultValue: 'USER' })
  role: string;

  @ForeignKey(() => Basket)
  baksetId: number;

  @HasOne(() => Basket)
  basket: Basket;

  @HasMany(() => Rating)
  rating: Rating;

  @ForeignKey(() => Rating)
  ratingId: number;
}

// User.hasOne(Basket);
// Basket.belongsTo(User);

// User.hasMany(Rating);
// Rating.belongsTo(User);

// Basket.hasMany(BasketDevice);
// BasketDevice.belongsTo(Basket);

// Type.hasMany(Device);
// Device.belongsTo(Type);

// Brand.hasMany(Device);
// Device.belongsTo(Brand);

// Device.hasMany(Rating);
// Rating.belongsTo(Device);

// Device.hasMany(BasketDevice);
// BasketDevice.belongsTo(Device);

// Device.hasMany(DeviceInfo, { as: 'info' });
// DeviceInfo.belongsTo(Device);

// Type.belongsToMany(Brand, { through: TypeBrand });
// Brand.belongsToMany(Type, { through: TypeBrand });
