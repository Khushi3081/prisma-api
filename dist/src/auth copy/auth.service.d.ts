import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { SignUp } from './dto/sign-up.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(signUp: SignUp): Promise<User>;
    login(email: string, password: string): Promise<User>;
    verifyPayload(payload: JwtPayload): Promise<User>;
    signToken(user: User): string;
}
