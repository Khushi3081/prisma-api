import { UpdateForgotPasswordDto } from './dto/update-forgot-password.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ForgotPasswordService {
    private prisma;
    constructor(prisma: PrismaService);
    forgotPass(postData: any): Promise<import(".prisma/client").user>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateForgotPasswordDto: UpdateForgotPasswordDto): string;
    remove(id: number): string;
}
