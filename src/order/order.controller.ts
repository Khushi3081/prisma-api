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
} from '@nestjs/common';
import { OrderService } from './order.service';
import { createOrderDataDto } from './dto/create-order.dto';
import { CartService } from 'src/cart/cart.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('add-order')
  create(@Body() postData: createOrderDataDto,@Req() req:Request) {
    return this.orderService.create(postData,req);
  }

//   @Get()
//   @Render('order')
//   async findAll() {}

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.orderService.findOne(+id);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.orderService.remove(+id);
//   }
}
