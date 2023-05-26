import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { ProductService } from 'src/product/product.service';
export declare class SubCategoryController {
    private readonly subCategoryService;
    private readonly productService;
    constructor(subCategoryService: SubCategoryService, productService: ProductService);
    subCategory(): Promise<{
        category: import(".prisma/client").category[];
    }>;
    create(postData: CreateSubCategoryDto): Promise<import(".prisma/client").subCategory>;
    list(): Promise<{
        data: (import(".prisma/client").product & {
            subCategory: import(".prisma/client").subCategory & {
                candidate: import(".prisma/client").category;
            };
        })[];
    }>;
    findOne(id: string): Promise<{
        data: {
            id: number;
            name: string;
            candidate: {
                name: string;
            };
        };
        data1: {
            category: import(".prisma/client").category[];
        };
    }>;
    update(id: string, postData: UpdateSubCategoryDto): Promise<import(".prisma/client").subCategory>;
    remove(id: string): string;
}
