import { Injectable } from '@nestjs/common';
import { request } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addProduct(req) {
    let data = await this.prisma.cart.create({
      data: {
        p_id: parseInt(req.body.ids),
        user_id: req.cookies.data.id,
        p_quantity: 1,
      },
    });
    return data;
  }

  async update(id, body) {
    let data = await this.prisma.cart.update({
      where: {
        id: id,
      },
      data: {
        p_quantity: parseInt(body.number),
      },
    });
    return data;
  }

  async showProduct(req) {
    // console.log(await);

    let data = await this.prisma.cart.findMany({
      where: {
        user_id: req.cookies.data.id,
        p_quantity: {
          gt: 0,
        },
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
        id: id,
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
