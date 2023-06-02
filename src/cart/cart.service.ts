import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addProduct(req) {
    return this.prisma.cart.upsert({
      where: {
        p_id: parseInt(req.body.id),
      },
      update: {
        p_quantity: {
          increment: 1,
        },
        deleted_at: null,
      },
      create: {
        p_id: Number(req.body.id),
        user_id: 2,
        deleted_at: null, 
      },
    });
  }

  async update(id, body) {
    let data = await this.prisma.cart.update({
      where: {
        p_id: id,
      },
      data: {
        p_quantity: parseInt(body.number),
      },
    });
    return data;
  }

  async showProduct() {
    let data = await this.prisma.cart.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        product: true,
      },
    });
    return data;
  }

  async showUser() {
    return this.prisma.user.findMany({});
  }
  async removeCart(postData) {
    let data;
    for (const id of postData.cartIds) {
      data = await this.prisma.cart.update({
        where: {
          id: parseInt(id),
        },
        data: {
          deleted_at: new Date(),
          p_quantity: 0,
        },
        select: {
          p_id: true,
          user_id: true,
        },
      });
    }
    return data;
  }
  async removeProduct(id: number) {
    let data = await this.prisma.cart.update({
      where: {
        p_id: id,
      },
      data: {
        p_quantity: {
          decrement: 1,
        },
        updated_at: new Date(),
      },
    });

    return data;
  }
}
