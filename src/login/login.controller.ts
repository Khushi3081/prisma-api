import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Res,
  UseGuards,
  Response,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { loginDataDto } from './dto/login.dto';
import { loginGuard } from './jwt-login.guard';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthEntity } from './entitities/login-entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('auth')
@Controller('login')
export class LoginController {
  prisma: any;
  constructor(
    private readonly loginService: LoginService,
    private jwtService: JwtService,
    private AuthService:AuthService
  ) {}

  @Get()
  @Render('login')
  root() {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleRegister() {}
  
  @Get('google/callback')
  @Redirect('/dashboard')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.AuthService.googleRegister(req);
  }
  
  @Post('auth')
  @ApiOkResponse({ type: AuthEntity })
  async login(
    @Req() req: Request,
    @Response()
    res,
    @Body() postData: loginDataDto,
  ): Promise<any> {
    let result = await this.loginService.login(postData);
    if (result.access_token) {
      res.cookie('access_token', result.access_token, { httpOnly: true });
      const payload: any = await this.jwtService.verifyAsync(
        result.access_token,
        {
          secret: jwtConstants.secret,
        },
      );

      res.cookie('data', payload, { httpOnly: true });
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
        message: `Login Successfull`,
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        data: null,
        message: `Incorrect Credentials`,
      });
    }
  }

  // @UseGuards(AuthGuard)
  // @Get('/category')
  // async getProfile(@Req() req: Request): Promise<any> {
  //   return req.user;
  // }
}
