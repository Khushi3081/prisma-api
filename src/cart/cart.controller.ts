import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Render,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { updateCartDataDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('addCart')
  async addProduct(@Req() req) {
    let data = await this.cartService.addProduct(req);
    return data;
  }
  @Patch('addQnt/:id')
  async update(@Param('id') id: number, @Req() req: Request) {
    let body = req.body;
    let data = await this.cartService.update(+id, body);
    return data;
  }
  @Get('cart-list/:id')
  @Render('cart-list')
  async showProduct(@Req() req: Request) {
    let data = await this.cartService.showProduct(req);
    return { data };
  }
  @Patch('remove-cart')
  async removeCart(@Body() postData: updateCartDataDto, @Req() req: Request) {
    let data = await this.cartService.removeCart(postData, req);
    return data;
  }
  @Patch('delete/:id')
  async remove(@Param('id') id: number) {
    let data = await this.cartService.removeProduct(+id);
    return data;
  }
}
