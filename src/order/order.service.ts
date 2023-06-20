import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(postData, req) {
    let data = await this.prisma.order.create({
      data: {
        c_id: parseInt(postData.cart_id),
        user_id: req.cookies.data.id,
      },
    });
    return data;
  }

  async findAll(req) {
    let data = await this.prisma.order.findMany({
      orderBy: {
        user_id: 'desc',
      },
      take: 1,
      include: {
        cart: {
          include: {
            cart_product: {
              include: {
                product: true,
              },
            },
          },
        },
        user: true,
      },
    });
    return data;
  }
}
