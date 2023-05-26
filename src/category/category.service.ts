import { Get, Injectable, Render } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { categoryDataDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(postData) {
    return this.prisma.category.create({
      data: {
        name: postData.category,
      },
    });
  }
  async showlist() {
    let data = this.prisma.category.findMany({});
    return data;
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
      },
    });
    return result;
  }
}
