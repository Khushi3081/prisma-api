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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { query } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  @Render('product')
  async categoryshow() {
    const category = await this.productService.categoryfindAll();
    return category;
  }
  @Post()
  @Redirect('product/product-list')
  create(@Body() postData: CreateProductDto) {
    return this.productService.createProduct(postData);
  }

  @Get('product-list/:id')
  @Render('product-list')
  async list(@Param('id') id: number) {
    let data = await this.productService.showlist(+id);
    return { data: data };
  }
  @Get('sub/:id')
  async findAll(@Param('id') id: string) {
    const subCategory = await this.productService.findSub(+id);
    return { subcategory: subCategory };
  }
  @Get('/:id')
  @Render('update-product')
  async findOne(@Param('id') id: string) {
    const category = await this.productService.categoryfindAll();
    const data = await this.productService.subfindAll(+id);
    return { category, data };
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() postData: UpdateProductDto) {
    return this.productService.update(+id, postData);
  }

  @Patch('/delete/:id')
  remove(@Param('id') id: number) {
    return this.productService.remove(+id);
  }
}
