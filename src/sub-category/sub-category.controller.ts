import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Render,
  Query,
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

  @Get('search')
  async search(@Query('name') name: string) {
    return this.subCategoryService.search(name);
  }

  @Post('')
  async create(@Body() postData: CreateSubCategoryDto) {
    return this.subCategoryService.createSubCategory(postData);
  }

  @Get('/sub-list/:id')
  @Render('sub-category-list')
  async list(@Param('id') id: number) {
    let data = await this.subCategoryService.showlist(+id);
    return { data: data };
  }

  @Get(':id')
  @Render('update-subCategory')
  async findOne(@Param('id') id: string) {
    let data1 = await this.subCategoryService.findAll();
    let data = await this.subCategoryService.findOne(+id);

    return { data, data1 };
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() postData: UpdateSubCategoryDto) {
    return this.subCategoryService.update(+id, postData);
  }

  @Patch('/delete/:id')
  remove(@Param('id') id: number) {
    return this.subCategoryService.remove(+id);
  }
}
