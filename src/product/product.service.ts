import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(postData) {
    // console.log(postData);

    return this.prisma.product.create({
      data: {
        name: postData.productname,
        price: postData.productprice,
        quantity: postData.productquntity,
        c_id: parseInt(postData.c_id),
        sub_id: parseInt(postData.sub_id),
      },
    });
  }

  async showlist() {
    let data = await this.prisma.product.findMany({
      include: {
        subCategory: {
          include: {
            candidate: true,
          },
        },
      },
    });
    // console.log(data[0].subCategory.candidate, '{{}}{{{}');
    return data;
  }

  async categoryfindAll() {
    const categories = await this.prisma.category.findMany({});
    return { category: categories };
  }

  async subfindAll(id: number) {
    const subcategories = await this.prisma.subCategory.findMany({
      where: {
        c_id: Number(id),
      },
    });
    return { subcategory: subcategories };
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
