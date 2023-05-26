import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubCategoryDto {
    @IsString()
    c_id:number
    subcategory:string
}
