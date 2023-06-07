import { Injectable } from '@nestjs/common';
import { request } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  //product add and quantity update
  async addProduct(req) {
    console.log(req.body.ids);

    let cartData = await this.prisma.cart.findMany({
      where: {
        user_id: req.cookies.data.id,
      },
    });

    let data = await this.prisma.cart_product.upsert({
      where: {
        p_id: parseInt(req.body.ids),
      },
      update: {
        p_quantuty: {
          increment: 1,
        },
      },
      create: {
        p_id: parseInt(req.body.ids),
        cart_id: cartData[0].id,
        p_quantuty: 1,
      },
    });
    return data;
  }

  // quantity update form list
  async update(id, body) {
    let data = await this.prisma.cart_product.update({
      where: {
        id: id,
      },
      data: {
        p_quantuty: parseInt(body.number),
      },
    });
    return data;
  }

  async showProduct(req) {
    let data = await this.prisma.cart.findFirst({
      where: {
        AND: [
          {
            user_id: req.cookies.data.id,
          },
          {
            status: 'active',
          },
        ],
      },
      include: {
        cart_product: {
          where: {
            p_quantuty: {
              gt: 0,
            },
          },
          include: {
            product: true,
          },
        },
      },
    });

    return data;
  }

  async showUser() {
    return this.prisma.user.findMany({});
  }

  // //delete cart whn order is placed
  async removeCart(postData) {
    let data;
    data = await this.prisma.cart.update({
      where: {
        id: parseInt(postData.cart_id),
      },
      data: {
        status: 'inActive',
      },
    });
    return data;
  }

  // //delete quantity
  async removeProduct(id: number) {
    let data = await this.prisma.cart_product.update({
      where: {
        id: id,
      },
      data: {
        p_quantuty: {
          decrement: 1,
        },
      },
    });
    return data;
  }
}
