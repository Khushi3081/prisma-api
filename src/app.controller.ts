import {
  Controller,
  Get,
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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleRegister() {}

  @Get('/google/callback')
  @Redirect('/main')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req,
    @Response()
    res,
  ) {
    let answer = await this.authService.googleRegister(req);

    if (answer['token']) {
      res.cookie('access_token', answer['token'], { httpOnly: true });
      const payload: any = await this.jwtService.verifyAsync(answer['token'], {
        secret: jwtConstants.secret,
      });

      res.cookie('data', payload, { httpOnly: true });
      // return res.status(HttpStatus.OK).json({
      //   data: answer,
      // });
    }
  }

  @Get('admin')
  @Render('admin.ejs')
  admin() {}
}
