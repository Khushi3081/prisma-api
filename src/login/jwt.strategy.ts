import { Strategy,ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginService } from "./login.service";
import { loginDataDto } from "./dto/login.dto";
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private loginService:LoginService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }
    async chkUser(payload:any) {
        return {email:payload.email,password:payload.password};
    }   
}