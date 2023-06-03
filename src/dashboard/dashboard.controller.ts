import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Req,
  UseGuards,
  Res,
  Query,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { loginGuard } from '../login/jwt-login.guard';
import { Request, Response, query } from 'express';
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    await res.clearCookie('access_token');
    await res.clearCookie('data');
    return res.redirect('/login');
  }

  @Get('search')
  async search(@Query('pName') pName: string) {
    return this.dashboardService.search(pName);
  }

  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @Get('')
  @UseGuards(loginGuard)
  @Render('dashboard.ejs')
  findAll(@Req() req: Request) {
    return this.dashboardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
}
