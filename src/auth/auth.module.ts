import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, JwtService, CartModule, PrismaService],
})
export class AuthModule {}
