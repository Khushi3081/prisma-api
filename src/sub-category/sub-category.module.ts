import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { PrismaService } from 'src/prisma.service';
import { categoryDataDto } from 'src/category/dto/category.dto';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';

@Module({
  controllers: [SubCategoryController],
  providers: [SubCategoryService, PrismaService, ProductService],
})
export class SubCategoryModule {}
