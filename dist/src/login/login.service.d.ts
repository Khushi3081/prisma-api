import { PrismaService } from 'src/prisma.service';
import { loginDataDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class LoginService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    checkUser(postData: loginDataDto): Promise<{
        id: number;
        name: string;
        email: string;
        googleProviderId: string;
        registerType: import(".prisma/client").registerType;
        role_id: number;
    }>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
