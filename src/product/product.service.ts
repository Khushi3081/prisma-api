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

  async showlist(id: number) {
    let count = await this.prisma.product.aggregate({
      _count: {
        id: true,
      },
      where: {
        deleted_at: null,
      },
    });
    let total = count._count.id;
    let total_table = await Math.ceil(total / 3);
    let page_no = id || 1;
    let offset = (page_no - 1) * 3;

    let data = await this.prisma.product.findMany({
      skip: offset,
      take: 3,
      include: {
        subCategory: {
          include: {
            candidate: true,
          },
        },
      },
      where: {
        deleted_at: null,
      },
    });
    // console.log(data[0].subCategory.candidate, '{{}}{{{}');
    return { data, total_table };
  }

  async categoryfindAll() {
    return await this.prisma.category.findMany({
      include: {
        subCats: true,
      },
    });
    // return { category: categories };
  }
  async findSub(id: number) {
    console.log(id);

    let data = await this.prisma.subCategory.findMany({
      where: {
        c_id: id,
      },
    });
    // console.log(data, '{{{{{{{{{{');

    return data;
  }
  async subfindAll(id: number) {
    let data = await this.prisma.product.findMany({
      where: {
        id: id,
      },
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

  async update(id: number, postData) {
    let result = await this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: postData.name,
        price: postData.price,
        quantity: postData.quantity,
        c_id: parseInt(postData.c_id),
        sub_id: parseInt(postData.sub_id),
      },
    });
    return result;
  }

  async remove(id: number) {
    let result = await this.prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        deleted_at: new Date(),
      },
    });
    console.log(result);
  }
}
