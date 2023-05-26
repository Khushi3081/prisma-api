import userDataDto from 'src/user/dto/user.dto';
import { user } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(postData: userDataDto): Promise<user>;
    googleRegister(req: any): Promise<string>;
}
