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
  Redirect,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { createOrderDataDto } from './dto/create-order.dto';
import { CartService } from 'src/cart/cart.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('add-order')
  create(@Body() postData: createOrderDataDto, @Req() req: Request) {
    return this.orderService.create(postData, req);
  }

  @Get('order-list')
  @Render('order-list')
  async findAll(@Req() req: Request) {
    let data = await this.orderService.findAll(req);
    return { data };
  }

}
