import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Redirect,
} from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { ProductService } from 'src/product/product.service';

@Controller('sub-category')
export class SubCategoryController {
  constructor(
    private readonly subCategoryService: SubCategoryService,
    private readonly productService: ProductService,
  ) {}

  @Get('')
  @Render('subCategory')
  async subCategory() {
    return await this.subCategoryService.findAll();
  }

  @Post('')
  @Redirect('sub-category/sub-list')
  async create(@Body() postData: CreateSubCategoryDto) {
    return this.subCategoryService.createSubCategory(postData);
  }

  @Get('sub-list')
  @Render('sub-category-list')
  async list() {
    let data = await this.productService.showlist();
    // console.log(data);
    return { data: data };
  }

  @Get(':id')
  @Render('update-subCategory')
  async findOne(@Param('id') id: string) {
    let data1 = await this.subCategoryService.findAll();
    let data = await this.subCategoryService.findOne(+id);
      return { data: data, data1: data1 };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() postData: UpdateSubCategoryDto) {
    return this.subCategoryService.update(+id, postData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subCategoryService.remove(+id);
  }
}
