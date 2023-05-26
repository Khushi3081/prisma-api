import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    categoryshow(): Promise<{
        category: import(".prisma/client").category[];
    }>;
    create(postData: CreateProductDto): Promise<import(".prisma/client").product>;
    list(): Promise<{
        data: (import(".prisma/client").product & {
            subCategory: import(".prisma/client").subCategory & {
                candidate: import(".prisma/client").category;
            };
        })[];
    }>;
    subcategoryshow(id: string): Promise<{
        subcategory: import(".prisma/client").subCategory[];
    }>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
