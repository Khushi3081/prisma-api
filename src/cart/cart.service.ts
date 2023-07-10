import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  //product add and quantity update
  async addProduct(req) {
    let cartData = await this.prisma.cart.findMany({
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
            p_id: parseInt(req.body.ids),
          },
        },
      },
    });

    if (cartData[0].cart_product[0]) {
      return await this.prisma.cart_product.updateMany({
        where: {
          AND: [
            {
              cart_id: cartData[0].id,
            },
            {
              p_id: parseInt(req.body.ids),
            },
          ],
        },
        data: {
          p_quantuty: {
            increment: 1,
          },
        },
      });
    } 
    else {
      return await this.prisma.cart_product.create({
        data: {
          p_id: parseInt(req.body.ids),
          cart_id: cartData[0].id,
          p_quantuty: 1,
        },
      });
    }
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

   //delete cart whn order is placed
  async removeCart(postData, req) {
    let data;
    data = await this.prisma.cart.update({
      where: {
        id: parseInt(postData.cart_id),
      },
      data: {
        status: 'inActive',
      },
    });
    let newCart = await this.prisma.cart.create({
      data: {
        user_id: req.cookies.data.id,
        created_at: new Date(),
        status: 'active',
      },
    });
    return { data, newCart };
  }

  //delete quantity
  async removeProduct(id: number) {
    let product = await this.prisma.cart_product.findMany({
      where: {
        id: id,
      },
      select: {
        p_quantuty: true,
      },
    });
    if (product[0].p_quantuty > 1) {
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
    } else {
      let data = await this.prisma.cart_product.delete({
        where: {
          id: id,
        },
      });
      return data;
    }
  }
}
