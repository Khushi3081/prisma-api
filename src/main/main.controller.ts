import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Render,
  Req,
} from '@nestjs/common';
import { MainService } from './main.service';
import { CreateMainDto } from './dto/create-main.dto';
import { UpdateMainDto } from './dto/update-main.dto';
import { loginGuard } from 'src/login/jwt-login.guard';

@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get('')
  @UseGuards(loginGuard)
  @Render('main.ejs')
  findAll(@Req() req: Request) {
    return this.mainService.findAll();
  }

  @Post()
  create(@Body() createMainDto: CreateMainDto) {
    return this.mainService.create(createMainDto);
  }
}
