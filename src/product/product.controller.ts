import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Render,
  Redirect,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { query } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  @Render('product')
  async categoryshow() {
    const category = await this.productService.categoryfindAll();
    return { category };
  }

  @Get('search')
  async search(@Query('name') name: string) {
    return this.productService.search(name);
  }

  @Post()
  @Redirect('/product/product-list/1')
  @UseInterceptors(FileInterceptor('productimage', { dest: './assets' }))
  create(
    @Body() postData: CreateProductDto,
    @UploadedFile() productimage: Express.Multer.File,
  ) {
    return this.productService.createProduct(postData, productimage);
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

  @Post('/update/:id')
  @Redirect('/product/product-list/1')
  @UseInterceptors(FileInterceptor('productimage', { dest: './assets' }))
  update(
    @Param('id') id: string,
    @Body() postData: UpdateProductDto,
    @UploadedFile() productimage: Express.Multer.File,
  ) {
    return this.productService.update(+id, postData, productimage);
  }

  @Patch('/delete/:id')
  remove(@Param('id') id: number) {
    return this.productService.remove(+id);
  }
}
