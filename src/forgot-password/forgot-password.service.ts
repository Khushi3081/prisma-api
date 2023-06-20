import { Injectable } from '@nestjs/common';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { UpdateForgotPasswordDto } from './dto/update-forgot-password.dto';
import { PrismaService } from 'src/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

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

    if (!user) {
      throw new Error('Email does not exists..');
    }
    let number = '';
    for (let i = 0; i < 4; i++) {
      number += [Math.floor(Math.random() * 10)];
    }
    let otp = number;
    // let resetLink = crypto.randomBytes(64).toString('hex');

    await this.prisma.forgotPassword.upsert({
      where: {
        user_id: user.id,
      },
      create: {
        user: { connect: { id: user.id } },
        token: otp,
        updated_at: new Date(),
      },
      update: {
        token: otp,
        user_id: user.id,
      },
    });
    // let link = `/forgot-password/reset-password/?token=${resetLink}&id=${user.id}`;
    this.mailerService.sendMail({
      to: 'rachchh.khushi30@gmail.com',
      from: 'rachchh.khushi30@gmail.com',
      subject: 'Forgot Password Change',
      text: 'Welcome',
      html: `<p style="font-size:3 rem,font-weight:bold">${otp}</p>`,
    });

    return {
      user_id: user.id,
    };
  }

  async check(postData, res: Response, req) {
    let findUserdata = await this.prisma.forgotPassword.findFirst({
      where: {
        user_id: parseInt(req.body.id),
      },
    });

    let savedToken = findUserdata.token;

    if (savedToken != req.body.otp) {
      return 'token is not valid';
    } else {
      return {
        user_id: findUserdata.user_id,
      };
    }
  }

  async update(req, res) {
    const hashPass = await bcrypt.hash(req.body.password, saltRounds);
    const addUpdate = await this.prisma.user.update({
      where: {
        id: parseInt(req.body.u_id),
      },
      data: {
        password: hashPass,
      },
    });
    res.redirect('/login');
  }

}
