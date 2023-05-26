import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { SignUp } from './dto/sign-up.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(signUp: SignUp): Promise<User>;
    login(user: User): Promise<User>;
    me(user: User): User;
}
