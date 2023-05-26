import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { loginDataDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtLoginGuard } from './jwt-login.guard';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('login')
export class LoginController {
  prisma: any;
  constructor(private readonly loginService: LoginService) {}
  private jwtService: JwtService;
  @Get()
  @Render('login')
  root() {}

  // @Post()
  // async checkUser(@Body() postData: loginDataDto, @Res() res: Response) {
  //   const condition = await this.loginService.checkUser(postData);
  //   console.log(condition);

  //   if (condition) {
  //     // res.send({
  //     //   accessToken: 'dasfjakdassad',
  //     // });
  //     // console.log('condition', condition);
  //     return {
  //       access_token: 'dasda',
  //     };
  //     // res.redirect('/');
  //   } else {
  //     // console.log('condition', condition);
  //     res.redirect('/login');
  //   }
  // }
  @UseGuards(LocalAuthGuard)
  @Post('/auth')
  async login(@Request() req): Promise<any> {
    return this.loginService.login(req.user);
  }
  @UseGuards(JwtLoginGuard)
  @Get('/category')
  async getProfile(@Request() req): Promise<any> {
    return req.user;
  }
}
