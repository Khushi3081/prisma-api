import { PrismaService } from 'src/prisma.service';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    createCategory(postData: any): Promise<import(".prisma/client").category>;
    showlist(): Promise<import(".prisma/client").category[]>;
    findOne(id: number): Promise<import(".prisma/client").category>;
    update(id: number, postData: any): Promise<import(".prisma/client").category>;
}
