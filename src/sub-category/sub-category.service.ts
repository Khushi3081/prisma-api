import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class SubCategoryService {
  constructor(private prisma: PrismaService) {}

  async createSubCategory(postData) {
    return this.prisma.subCategory.create({
      data: {
        c_id: parseInt(postData.c_id),
        name: postData.subcategory,
      },
    });
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({});
    return { category: categories };
  }
  async showlist(id: number) {
    let count = await this.prisma.subCategory.aggregate({
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
    const subcategories = await this.prisma.subCategory.findMany({
      skip: offset,
      take: 3,
      include: {
        candidate: true,
      },
      where: {
        deleted_at: null,
      },
    });

    return { subcategories, total_table };
  }

  async search(name) {
    let result = await this.prisma.subCategory.findMany({
      include: {
        candidate: true,
      },
      where: {
        OR: [
          {
            name: {
              contains: `%${name}%`,
            },
          },
          {
            candidate: {
              name: {
                contains: `%${name}%`,
              },
            },
          },
        ],
      },
    });
    return result;
  }

  async findOne(id: number) {
    let data = await this.prisma.subCategory.findMany({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        candidate: {
          select: {
            name: true,
          },
        },
      },
    });
    return data;
  }

  async update(id: number, postData) {
    let result = await this.prisma.subCategory.update({
      where: {
        id: id,
        // deleted_at:null
      },
      data: {
        name: postData.name,
        c_id: parseInt(postData.c_name),
        updated_at: new Date(),
      },
    });
    return result;
  }

  async remove(id: number) {
    let result = await this.prisma.subCategory.update({
      where: {
        id: Number(id),
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
