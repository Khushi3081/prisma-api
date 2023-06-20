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
      request.route.path == '/google' ||
      request.route.path == '/google/callback' ||
      request.route.path == '/login' ||
      request.route.path == '/login/auth' ||
      request.route.path == '/login/google' ||
      request.route.path == '/dashboard' ||
      request.route.path == '/auth' ||
      request.route.path == '/forgot-password' ||
      request.route.path == '/forgot-password/send' ||
      request.route.path == '/forgot-password/checkOtp' ||
      request.route.path == '/forgot-password/reset-Password'
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

    const token = request.cookies['access_token'];

    if (!token) {
      response.redirect('/login');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      if (
        array.includes(request.route.path) &&
        (payload.role == 'user' || payload.role == 'user:admin')
      ) {
        response.redirect('/main');
      }

      if (user.includes(request.route.path) && payload.role == 'admin') {
        response.redirect('/admin');
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
export class googleGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    // console.log(request.headers.cookie?.split(';')[1]?.split('=')[1]);

    if (
      request.route.path == '/google' ||
      request.route.path == '/google/callback' ||
      request.route.path == '/login' ||
      request.route.path == '/login/auth' ||
      request.route.path == '/login/google' ||
      request.route.path == '/dashboard' ||
      request.route.path == '/auth' ||
      request.route.path == '/forgot-password' ||
      request.route.path == '/dashboard/logout'
    ) {
      return true;
    }

    let token = request.headers.cookie?.split(';')[1]?.split('=')[1];
    if (!token) {
      response.redirect('/login');
    }

    return true;
  }
}
