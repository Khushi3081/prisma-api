import { Injectable } from '@nestjs/common';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { UpdateForgotPasswordDto } from './dto/update-forgot-password.dto';
import { PrismaService } from 'src/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { request } from 'http';
let saltRounds = 10;
@Injectable()
export class ForgotPasswordService {
  constructor(
    private prisma: PrismaService,
    public mailerService: MailerService,
  ) {}

  async findEmail(req) {
    const email = req.body.email;
    const user = await this.prisma.user.findFirst({
      where: { email: String(email) },
    });
    console.log(user);
    if (!user) {
      throw new Error('Email does not exists..');
    }
    let resetLink = crypto.randomBytes(64).toString('hex');
    console.log(request);

    await this.prisma.forgotPassword.upsert({
      where: {
        user_id: user.id,
      },
      create: {
        user: { connect: { id: user.id } },
        token: resetLink,
        updated_at: new Date(),
      },
      update: {
        token: resetLink,
        user_id: user.id,
      },
    });
    let link = `http://localhost:5000/forgot-password/reset-password/?token=${resetLink}&id=${user.id}`;
    this.mailerService.sendMail({
      to: 'rachchh.khushi30@gmail.com',
      from: 'rachchh.khushi30@gmail.com',
      subject: 'Forgot Password Change',
      text: 'Welcome',
      html: `<b> ${link} <b>`,
    });

    return 'Check your email';
  }

  async update(postData, query, res: Response) {
    let findUserdata = await this.prisma.forgotPassword.findFirst({
      where:{
        id:query.id,
      }
    })
    let savedToken = findUserdata.token;
    if(savedToken != query.token){
     throw new Error('token is not valid');
  }
  const hashPass = await bcrypt.hash(postData.password, saltRounds);
  const addUpdate = await this.prisma.user.update({
    where:{
      id:findUserdata.user_id
    },
    data:{
      password:hashPass
    }
  })
  res.redirect('/login');
}

  remove(id: number) {
    return `This action removes a #${id} forgotPassword`;
  }
}
