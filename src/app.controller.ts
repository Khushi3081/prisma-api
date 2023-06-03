import {
  Controller,
  Get,
  HttpStatus,
  Redirect,
  Render,
  Req,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Request } from 'express';
import { LoginService } from './login/login.service';
import { jwtConstants } from './login/constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly loginService: LoginService,
    private jwtService: JwtService,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleRegister() {}

  @Get('/google/callback')
  @Redirect('/dashboard')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req,
    @Response()
    res,
  ) {
    let answer = this.authService.googleRegister(req);
    let result = await this.loginService.login(req);
    if (result.access_token) {
      res.cookie('access_token', result.access_token, { httpOnly: true });
      const payload: any = await this.jwtService.verifyAsync(
        result.access_token,
        {
          secret: jwtConstants.secret,
        },
      );

      res.cookie('data', payload, { httpOnly: true });
      res.status(HttpStatus.OK).json({});
    }
    return { answer, result };
  }

  @Get('admin')
  @Render('admin.ejs')
  admin() {}
}
