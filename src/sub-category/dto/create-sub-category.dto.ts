import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubCategoryDto {
    @IsString()
    c_id:number
    subcategory:string
    created_at: Date
    updated_at: Date
    deleted_at: Date
}
