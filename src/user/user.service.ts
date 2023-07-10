import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { user, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
  }
  async getAllUser(): Promise<user[]> {
    return this.prisma.user.findMany();
  }

  async search(name: string) {
    let data = await this.prisma.user.findMany({
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
            email: {
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
    return data;
  }
  async createUser(postData): Promise<user> {
    const hashPass = await bcrypt.hash(postData.password, saltRounds);
    postData.password = hashPass;
    return this.prisma.user.create({
      data: {
        name: postData.name,
        email: postData.email,
        password: postData.password,
        role_id: 3,
        google_provider_id: 'null',
        register_type: 'Platform',
      },
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
