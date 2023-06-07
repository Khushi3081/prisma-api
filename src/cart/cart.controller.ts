import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  Render,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { request } from 'http';
import { updateCartDataDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('addCart')
  // @Redirect('/cart/cart-list/1')
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
    // let user_data = await this.cartService.showUser();
    return { data };
  }
  @Patch('remove-cart')
  async removeCart(@Body() postData: updateCartDataDto) {
    let data = await this.cartService.removeCart(postData);
    return data;
  }
  @Patch('delete/:id')
  async remove(@Param('id') id: number) {
    let data = await this.cartService.removeProduct(+id);
    return data;
  }
}
