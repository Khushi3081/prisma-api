import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Render,
  Req,
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

  @Get('search')
  async search(@Query('name') name: string) {
    return this.categoryService.search(name);
  }
  @Post('')
  // @Redirect('category/category-list/1')
  async createCategory(@Body() postData: categoryDataDto) {
    return await this.categoryService.createCategory(postData);
  }

  @Get('category-list/:id')
  @Render('category-list')
  async list(@Param('id') id: number, @Req() request: Request) {
    let data = await this.categoryService.showlist(+id);
    return { data: data };
  }

  @Get('/data/:id')
  @Render('update-category')
  async findOne(@Param('id') id: string) {
    let data = await this.categoryService.findOne(+id);

    return { data: data };
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() postData: updateCategoryDataDto) {
    return this.categoryService.update(+id, postData);
  }

  @Patch('/delete/:id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(+id);
  }
}
