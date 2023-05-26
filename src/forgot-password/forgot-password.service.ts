import { Injectable } from '@nestjs/common';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { UpdateForgotPasswordDto } from './dto/update-forgot-password.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ForgotPasswordService {
  constructor(private prisma: PrismaService) {}

  async forgotPass(postData) {
    const email = postData.email;
    const user = await this.prisma.user.findFirst({
      where: { email: String(email) },
    });
    return user;
    
  }
  findAll() {
    return `This action returns all forgotPassword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forgotPassword`;
  }

  update(id: number, updateForgotPasswordDto: UpdateForgotPasswordDto) {
    return `This action updates a #${id} forgotPassword`;
  }

  remove(id: number) {
    return `This action removes a #${id} forgotPassword`;
  }
}
