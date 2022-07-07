export interface ImageType {
  fieldname: string;
  originalName: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
export interface DeviceInfoType {
  title: string;
  description: string;
  deviceId: number;
}

export interface DeviceType {
  name: string;
  brandId: number;
  typeId: number;
  price: number;
  img: string;
}
