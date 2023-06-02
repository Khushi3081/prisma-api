import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import userDataDto from 'src/user/dto/user.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleRegister() {}

  @Get('google/callback')
  @Redirect('/login')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleRegister(req);
  }

  @Get()
  @Render('register')
  root() {}

  @Post('')
  @Redirect('/login')
  @UseInterceptors(AnyFilesInterceptor())
  async createUser(@Body() postData: userDataDto) {

    return this.authService.createUser(postData);
  }
}
