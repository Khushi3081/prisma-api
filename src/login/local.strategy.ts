import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private loginService: LoginService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email, password): Promise<any> {
    try {
      const user = await this.loginService.checkUser({ email, password });

      if (!user) {
        // return {
        throw new UnauthorizedException();
        // };
        // throw new UnauthorizedException();
        // res.send("incorrect credentials");
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
