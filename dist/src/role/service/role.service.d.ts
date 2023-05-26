import { PrismaService } from 'src/prisma.service';
import { role } from '@prisma/client';
export declare class RoleService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllRole(): Promise<role[]>;
    createRole(data: role): Promise<role>;
}
