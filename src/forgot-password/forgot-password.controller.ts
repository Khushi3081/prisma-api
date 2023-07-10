import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Render,
  Res,
  Req,
} from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { UpdateForgotPasswordDto } from './dto/update-forgot-password.dto';
import { Request, Response } from 'express';

@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Get('')
  @Render('forgot-password.ejs')
  root() {}

  @Post('/send')
  async create(@Req() req: Request, @Res() res: Response) {
    let data = await this.forgotPasswordService.findEmail(req);

    if (data) {
      res.json(data);
    } else {
      res.json(false);
    }
  }

  @Post('checkOtp')
  async checkOtp(
    @Body() postData: UpdateForgotPasswordDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    let data = await this.forgotPasswordService.check(postData, res, req);

    if (data == 'token is not valid') {
      res.json(false);
    } else {
      res.json(data);
    }
  }

  @Post('reset-Password')
  async updatePass(@Req() req: Request, @Res() res: Response) {
    return await this.forgotPasswordService.update(req, res);
  }
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateForgotPasswordDto: UpdateForgotPasswordDto,
  // ) {
  //   return this.forgotPasswordService.update(+id, updateForgotPasswordDto);
  // }
}
