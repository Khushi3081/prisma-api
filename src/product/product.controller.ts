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

  @Get('product-list')
  @Render('product-list')
  async list() {
    let data = await this.productService.showlist();
    return { data: data };
  }

  @Get('/:id')
  async subcategoryshow(@Param('id') id: string) {
    const subcategory = await this.productService.subfindAll(+id);
    return subcategory;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
