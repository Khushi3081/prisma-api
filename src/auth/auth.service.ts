import userDataDto from 'src/user/dto/user.dto';
import { user, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/login/constants';
const saltRounds = 10;
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async createUser(postData: userDataDto) {
    const hashPass = await bcrypt.hash(postData.password, saltRounds);
    postData.password = hashPass;
    let createUser = await this.prisma.user.create({
      data: {
        name: postData.name,
        email: postData.email,
        password: postData.password,
        google_provider_id: 'null',
        register_type: 'Platform',
      },
    });
    let cart = await this.prisma.cart.create({
      data: {
        user_id: createUser.id,
        created_at: new Date(),
      },
    });
    return { cart, createUser };
  }

  async checkUser(postData) {
    let data = await this.prisma.user.findMany({
      where: {
        email: postData.mail,
      },
    });
    return data;
  }

  async googleRegister(req) {
    const findUser = await this.prisma.user.findMany({
      where: {
        email: req.user.emails[0].value,
      },
    });
    if (findUser) {
      const payload = {
        id: findUser[0].id,
        email: findUser[0].email,
      };
      let token = await this.jwtService.sign(payload, {
        expiresIn: '30d',
        algorithm: 'HS256',
        secret: jwtConstants.secret,
      });
      return token;
    } else {
      let fname = req.user.name.familyName;
      let lname = req.user.name.givenName;
      let name = fname + lname;
      if (!req.user) {
        return `no user from Google`;
      } else {
        let data = await this.prisma.user.create({
          data: {
            name: name,
            email: req.user.emails[0].value,
            password: '',
            google_provider_id: req.user.id,
            register_type: req.user.provider,
            role_id: 2,
          },
        });
        let cart = await this.prisma.cart.create({
          data: {
            user_id: findUser[0].id,
            created_at: new Date(),
          },
        });
        return { data, cart };
      }
    }
  }
}
