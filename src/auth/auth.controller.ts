import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import userDataDto from 'src/user/dto/user.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import userCheckDataDto from 'src/user/dto/userCheck.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('mail') 
  async findUser(@Body() postData:userCheckDataDto) {
    return this.authService.checkUser(postData);
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
