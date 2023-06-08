import {
  Injectable,
  NotFoundException,
  Redirect,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { loginDataDto } from '../login/dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { jwtConstants } from './constants';
@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  // async checkUser(postData: loginDataDto) {
  //   const email = postData.email;
  //   const user = await this.prisma.user.findFirst({
  //     where: { email: String(email) },
  //   });

  //   const pass = postData.password;
  //   const answer = await bcrypt.compare(pass, user.password);
  //   console.log(answer);

  //   if (user && answer) {
  //     const { password, ...result } = user;
  //     // console.log(user);
  //     return result;
  //   }
  //   return null;
  // }

  async login(postData: loginDataDto) {
    // const email = postData.email;

    try {
      const findUser = await this.prisma.user.findUnique({
        where: {
          email: postData.email,
        },
        include: {
          candidate: true,
        },
      });

      if (findUser == null) {
        throw new NotFoundException(`Please check your email and password`);
      } else {
        const compare = await bcrypt.compare(
          postData.password,
          findUser.password,
        );

        if (compare) {
          const payload = {
            id: findUser.id,
            role: findUser.candidate.name,
          };

          return {
            access_token: await this.jwtService.sign(payload, {
              expiresIn: '30d',
              algorithm: 'HS256',
              secret: jwtConstants.secret,
            }),
            userData: findUser,
            userRole: findUser.candidate.name,
          };
        } else {
          throw new UnauthorizedException(
            'Please check your email and password',
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  // async genrateCookie(access_token, req, res) {

  //   res.cookie('access_token', access_token, {
  //     expires: new Date(new Date().getTime() + 30 * 1000),
  //     sameSite: 'strict',
  //     httpOnly: true,
  //   });
  // }
}
