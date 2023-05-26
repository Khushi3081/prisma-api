import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordController } from './forgot-password.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService,PrismaService]
})
export class ForgotPasswordModule {}
