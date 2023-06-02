import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { createOrderDataDto } from './dto/create-order.dto';
import { CartService } from 'src/cart/cart.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('add-order')
  create(@Body() postData: createOrderDataDto) {
    return this.orderService.create(postData);
  }

  @Get()
  @Render('order')
  async findAll() {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
