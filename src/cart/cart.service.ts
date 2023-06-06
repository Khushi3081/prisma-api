import { Injectable } from '@nestjs/common';
import { request } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  //product add and quantity update
  // async addProduct(req) {
  //   let data = await this.prisma.cart.upsert({
  //     where: {
  //       p_id: parseInt(req.body.ids),
  //     },
  //     update: {
  //       p_quantity: {
  //         increment: 1,
  //       },
  //     },
  //     create: {
  //       p_id: parseInt(req.body.ids),
  //       user_id: req.cookies.data.id,
  //       p_quantity: 1,
  //     },
  //   });
  //   return data;
  // }

  // //quantity update form list
  // async update(id, body) {
  //   let data = await this.prisma.cart.update({
  //     where: {
  //       id: id,
  //     },
  //     data: {
  //       p_quantity: parseInt(body.number),
  //     },
  //   });
  //   return data;
  // }

  // async showProduct(req) {
  //   let data = await this.prisma.cart.findMany({
  //     where: {
  //       user_id: req.cookies.data.id,
  //       p_quantity: {
  //         gt: 0,
  //       },
  //     },
  //     include: {
  //       product: true,
  //     },
  //   });
  //   return data;
  // }

  // async showUser() {
  //   return this.prisma.user.findMany({});
  // }

  // //delete cart whn order is placed
  // async removeCart(postData) {
  //   let data;
  //   for (const id of postData.cartIds) {
  //     data = await this.prisma.cart.delete({
  //       where: {
  //         id: parseInt(id),
  //       },
  //     });
  //   }
  //   return data;
  // }

  // //delete quantity
  // async removeProduct(id: number) {
  //   let data = await this.prisma.cart.update({
  //     where: {
  //       id: id,
  //     },
  //     data: {
  //       p_quantity: {
  //         decrement: 1,
  //       },
  //       updated_at: new Date(),
  //     },
  //   });

  //   return data;
  // }
}
