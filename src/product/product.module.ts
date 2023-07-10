import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { loginGuard } from 'src/login/jwt-login.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProductController],
  providers: [ProductService,PrismaService,JwtService,
    {
      provide: APP_GUARD,
      useClass: loginGuard,
    },]
})
export class ProductModule {}
