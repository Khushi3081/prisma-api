import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  // async create(postData) {
  //   let data;
  //   for (const id of postData.cartIds) {
  //     let data = await this.prisma.order.create({
  //       data: {
  //         c_id: parseInt(id),
  //       },
  //     });
  //   }
  //   return data;
  // }

  // async findAll() {
  //   let data = await this.prisma.cart.findMany({
  //     include: {
  //       product: true,
  //     },
  //   });
  //   // console.log(data);
  //   return data;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
