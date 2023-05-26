import userDataDto from 'src/user/dto/user.dto';
import { user, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcryptjs';
const saltRounds = 10;
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(postData: userDataDto) {
    const hashPass = await bcrypt.hash(postData.password, saltRounds);
    postData.password = hashPass;
    return this.prisma.user.create({
      data: {
        name: postData.name,
        email: postData.email,
        password: postData.password,
        googleProviderId: 'null',
        registerType: 'Platform',
      },
    });
  }

  async googleRegister(req) {
    try {
      console.log(req.user);
      let fname = req.user.name.familyName;
      let lname = req.user.name.givenName;
      let name = fname + lname;

      if (!req.user) {
        return `no user from Google`;
      } else {
        await this.prisma.user.create({
          data: {
            name: name,
            email: req.user.emails[0].value,
            password: req.user.password,
            googleProviderId: req.user.id,
            registerType: req.user.provider,
            role_id:2
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
