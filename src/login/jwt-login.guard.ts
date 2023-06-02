import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
// export class JwtLoginGuard extends AuthGuard('jwt') {}
export class loginGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    if (
      request.route.path == '/login' ||
      request.route.path == '/login/auth' ||
      request.route.path == '/dashboard' ||
      request.route.path == '/auth' ||
      request.route.path == '/forgot-password'
    ) {
      return true;
    }
    const array = [
      '/admin',
      '/user',
      '/category',
      '/sub-category',
      '/product',
      'user/user-list/:id',
      'user/user-list/2',
      'user/user-list/3',
      '/category/category-list/:id',
      '/category/category-list/2',
      '/category/category-list/3',
      '/sub-category/sub-list/:id',
      '/sub-category/sub-list/2',
      '/sub-category/sub-list/3',
      '/product/Product-List/:id',
      '/product/Product-List/2',
      '/product/Product-List/3',
    ];
    const user = ['/dashboard', '/cart/cart-list/:id', '/cart/cart-list/2'];
    const token = request.headers.cookie?.split(';')[0].split('=')[1];
    if (!token) {
      response.redirect('/login');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      if (
        array.includes(request.route.path) &&
        (payload.role == 2 || payload.role == 3)
      ) {
        response.redirect('/dashboard');
      }
      if (user.includes(request.route.path) && payload.role == 1) {
        response.redirect('/admin');
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
