import { Get, Injectable, Render } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async search(name) {
    let result = await this.prisma.category.findMany({
      where: {
        name: {
          contains: `%${name}%`,
        },
      },
    });
    return result;
  }

  async createCategory(postData) {
    return this.prisma.category.create({
      data: {
        name: postData.category,
      },
    });
  }

  async showlist(id: number) {
    let count = await this.prisma.category.aggregate({
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

    let data = await this.prisma.category.findMany({
      skip: offset,
      take: 3,
      where: {
        deleted_at: null,
      },
    });
    return { data, total_table };
  }

  async findOne(id: number) {
    let data = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    return data;
  }

  async update(id: number, postData) {
    let result = await this.prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: postData.name,
        updated_at: new Date(),
      },
    });
    return result;
  }

  async remove(id: number) {
    let result = await this.prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
