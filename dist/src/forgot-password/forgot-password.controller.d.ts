import { ForgotPasswordService } from './forgot-password.service';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { UpdateForgotPasswordDto } from './dto/update-forgot-password.dto';
export declare class ForgotPasswordController {
    private readonly forgotPasswordService;
    constructor(forgotPasswordService: ForgotPasswordService);
    root(): void;
    create(postData: CreateForgotPasswordDto): Promise<import(".prisma/client").user>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateForgotPasswordDto: UpdateForgotPasswordDto): string;
    remove(id: string): string;
}
