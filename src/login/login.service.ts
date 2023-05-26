import { Injectable, Redirect } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { loginDataDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async checkUser(postData: loginDataDto) {
    const email = postData.email;
    const user = await this.prisma.user.findFirst({
      where: { email: String(email) },
    });

    const pass = postData.password;
    const answer = await bcrypt.compare(pass, user.password);
    console.log(answer);

    if (user && answer) {
      const { password, ...result } = user;
      // console.log(user);
      return result;
    }
    return null;
  }
  async login(user: any) {
    try {
      const payload = { email: user.email, password: user.password };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      // console.log('error', error);
    }
  }
}
