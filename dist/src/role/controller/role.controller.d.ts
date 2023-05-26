import { RoleService } from '../service/role.service';
import { role } from '@prisma/client';
export declare class RoleController {
    private readonly RoleService;
    constructor(RoleService: RoleService);
    getAllRole(): Promise<role[]>;
    createTodo(postData: role): Promise<role>;
}
