import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { CartModule } from 'src/cart/cart.module';
import { CartController } from 'src/cart/cart.controller';
import { CartService } from 'src/cart/cart.service';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { loginGuard } from 'src/login/jwt-login.guard';

@Module({
  imports: [CartModule],
  controllers: [OrderController, CartController],
  providers: [
    OrderService,
    PrismaService,
    CartService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: loginGuard,
    },
  ],
})
export class OrderModule {}
