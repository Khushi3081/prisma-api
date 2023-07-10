import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { loginGuard } from 'src/login/jwt-login.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService,JwtService, {
    provide: APP_GUARD,
    useClass: loginGuard
  }],
})
export class CategoryModule {}
