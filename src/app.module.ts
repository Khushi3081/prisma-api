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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
