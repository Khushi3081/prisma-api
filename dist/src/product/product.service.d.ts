import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    createProduct(postData: any): Promise<import(".prisma/client").product>;
    showlist(): Promise<(import(".prisma/client").product & {
        subCategory: import(".prisma/client").subCategory & {
            candidate: import(".prisma/client").category;
        };
    })[]>;
    categoryfindAll(): Promise<{
        category: import(".prisma/client").category[];
    }>;
    subfindAll(id: number): Promise<{
        subcategory: import(".prisma/client").subCategory[];
    }>;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
