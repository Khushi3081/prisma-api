import { LoginService } from './login.service';
export declare class LoginController {
    private readonly loginService;
    prisma: any;
    constructor(loginService: LoginService);
    private jwtService;
    root(): void;
    login(req: any): Promise<any>;
    getProfile(req: any): Promise<any>;
}
