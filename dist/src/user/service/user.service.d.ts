import { PrismaService } from 'src/prisma.service';
import { user } from '@prisma/client';
export declare class UserService {
    private prisma;
    findOne(email: String): void;
    constructor(prisma: PrismaService);
    getAllUser(): Promise<user[]>;
    createUser(data: user): Promise<user>;
}
