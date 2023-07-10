export class CreateProductDto {
  name: string;
  price: string;
  quantity: string;
  image_name: string;
  image_path: string;
  c_id: number;
  sub_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
