import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(postData, productimage) {
    return this.prisma.product.create({
      data: {
        name: postData.productname,
        price: postData.productprice,
        quantity: postData.productquntity,
        image_name: productimage.filename,
        image_path: productimage.path,
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
    return { data, total_table };
  }

  async categoryfindAll() {
    return await this.prisma.category.findMany({
      include: {
        subCats: true,
      },
    });
  }

  async search(name: string) {
    let result = await this.prisma.product.findMany({
      include: {
        subCategory: {
          include: {
            candidate: true,
          },
        },
      },
      where: {
        OR: [
          {
            name: {
              contains: `%${name}%`,
            },
          },
          {
            subCategory: {
              name: {
                contains: `%${name}%`,
              },
            },
          },
          {
            subCategory: {
              candidate: {
                name: {
                  contains: `%${name}%`,
                },
              },
            },
          },
        ],
      },
    });
    console.log(result);

    return result;
  }
  async findSub(id: number) {
    let data = await this.prisma.subCategory.findMany({
      where: {
        c_id: id,
      },
    });
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
    return data;
  }

  async update(id: number, postData, productimage) {
    let result = await this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: postData.productname,
        price: postData.productprice,
        quantity: postData.productquntity,
        image_name: productimage.filename,
        image_path: productimage.path,
        c_id: parseInt(postData.c_id),
        sub_id: parseInt(postData.sub_id),
        updated_at: new Date(),
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
  }
}
