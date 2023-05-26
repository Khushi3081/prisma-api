import { PrismaService } from 'src/prisma.service';
export declare class SubCategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    createSubCategory(postData: any): Promise<import(".prisma/client").subCategory>;
    findAll(): Promise<{
        category: import(".prisma/client").category[];
    }>;
    findOne(id: number): Promise<{
        name: string;
        candidate: {
            name: string;
        };
        id: number;
    }>;
    update(id: number, postData: any): Promise<import(".prisma/client").subCategory>;
    remove(id: number): string;
}
