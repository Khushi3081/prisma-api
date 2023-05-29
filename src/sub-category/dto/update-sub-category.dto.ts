import { PartialType } from '@nestjs/mapped-types';

export class UpdateSubCategoryDto {
  c_id: number;
  category: string;
  subcategory: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
