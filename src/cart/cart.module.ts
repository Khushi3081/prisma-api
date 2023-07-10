import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { loginGuard } from 'src/login/jwt-login.guard';

@Module({
  controllers: [CartController],
  providers: [
    CartService,
    PrismaService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: loginGuard,
    },
  ],
})
export class CartModule {}
