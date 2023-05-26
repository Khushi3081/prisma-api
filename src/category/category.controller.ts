import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { categoryDataDto } from './dto/category.dto';
import { CategoryService } from './category.service';
import { updateCategoryDataDto } from './dto/update-category.dto';
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  @Render('category')
  root() {}

  @Post('')
  @Redirect('category/category-list')
  async createCategory(@Body() postData: categoryDataDto) {
    return this.categoryService.createCategory(postData);
  }

  @Get('category-list')
  @Render('category-list')
  async list() {
    let data = await this.categoryService.showlist();
    return { data: data };
  }

  @Get('/data/:id')
  @Render('update-category')
  async findOne(@Param('id') id: string) {
    let data = await this.categoryService.findOne(+id);
    // console.log(data);

    return { data: data };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() postData: updateCategoryDataDto) {
    return this.categoryService.update(+id, postData);
  }
}
