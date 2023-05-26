import { AuthService } from './auth.service';
import userDataDto from 'src/user/dto/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleRegister(): Promise<void>;
    googleAuthRedirect(req: any): Promise<string>;
    root(): void;
    createUser(postData: userDataDto): Promise<import(".prisma/client").user>;
}
