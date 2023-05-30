import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { user, Prisma } from '@prisma/client';
@Injectable()
export class UserService {
  findOne(email: String) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}
  async getAllUser(): Promise<user[]> {
    return this.prisma.user.findMany();
  }

  async createUser(data: user): Promise<user> {
    return this.prisma.user.create({
      data,
    });
  }
  async findRole() {
    let data = await this.prisma.role.findMany({});
    return data;
  }
  async userfindOne(id: number) {
    let data = await this.prisma.user.findMany({
      include: {
        candidate: true,
      },
      where: {
        id: +id,
      },
    });
    return data;
  }
  async update(id: number, postData) {
    let result = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: postData.name,
        email: postData.email,
        role_id: parseInt(postData.role_name),
      },
    });
    return result;
  }
  async showlist(id: number) {
    let count = await this.prisma.user.aggregate({
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

    let data = await this.prisma.user.findMany({
      include: {
        candidate: true,
      },
      skip: offset,
      take: 3,
      where: {
        deleted_at: null,
      },
    });

    return { data, total_table };
  }
  async remove(id: number) {
    let result = await this.prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
