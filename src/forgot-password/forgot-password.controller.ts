import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Res,
  Req,
  Query,
} from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { UpdateForgotPasswordDto } from './dto/update-forgot-password.dto';
import { Response } from 'express';

@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Get('')
  @Render('forgot-password.ejs')
  root() {}

  @Post()
  create(@Req() req: Request) {
    return this.forgotPasswordService.findEmail(req);
  }

  @Get('reset-password')
  @Render('reset-password')
  reset() {}

  @Post('reset-password')
  updatePass(
    @Body() postData: UpdateForgotPasswordDto,
    @Query() query,
    @Res() res: Response,
  ) {
    return this.forgotPasswordService.update(postData, query, res);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateForgotPasswordDto: UpdateForgotPasswordDto,
  // ) {
  //   return this.forgotPasswordService.update(+id, updateForgotPasswordDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forgotPasswordService.remove(+id);
  }
}
