import { UserService } from '../service/user.service';
import { user } from '@prisma/client';
export declare class UserController {
    private readonly UserService;
    constructor(UserService: UserService);
    getAllTodo(): Promise<user[]>;
}
