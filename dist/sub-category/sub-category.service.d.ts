import { PrismaService } from 'src/prisma.service';
export declare class SubCategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    createSubCategory(postData: any): Promise<import(".prisma/client").subCategory>;
    findAll(): Promise<{
        category: import(".prisma/client").category[];
    }>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        candidate: {
            name: string;
        };
    }>;
    update(id: number, postData: any): Promise<import(".prisma/client").subCategory>;
    remove(id: number): string;
}
