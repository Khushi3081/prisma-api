import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { loginDataDto } from '../login/dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

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
}
