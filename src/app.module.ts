import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ProductModule } from './product/product.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
// import { MulterModule } from '@nestjs/platform-express';
import { CartModule } from './cart/cart.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { OrderModule } from './order/order.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';
import { GoogleStrategy } from './auth/google.strategy';
import { LoginService } from './login/login.service';
import { APP_GUARD } from '@nestjs/core';
import { MainModule } from './main/main.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    AuthModule,
    LoginModule,
    CategoryModule,
    SubCategoryModule,
    ProductModule,
    ForgotPasswordModule,
    CartModule,
    DashboardModule,
    OrderModule,
    JwtModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'rachchh.khushi30@gmail.com',
          pass: 'lfmoqlbpeofvzpmx',
        },
      },
    }),
    MainModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    GoogleStrategy,
    AuthService,
    LoginService,
    PrismaService,
  ],
})
export class AppModule {}
