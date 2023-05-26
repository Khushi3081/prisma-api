import { Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { PrismaService } from 'src/prisma.service';
import { categoryDataDto } from 'src/category/dto/category.dto';
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

  async findOne(id: number) {
    let data = await this.prisma.subCategory.findUnique({
      where: {
        id: id,
      },
      select: {
        id:true,
        name:true,
        candidate: {
          select: {
            name: true,
          },
        },
      },
    });
console.log(data,'>>>>>>>');

    return data;
  }

  async update(id: number, postData) {
    let result = await this.prisma.subCategory.update({
      where: {
        id: id,
      },
      data: {
        name: postData.name,
      },
    });
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} subCategory`;
  }
}
