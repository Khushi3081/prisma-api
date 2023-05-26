import { categoryDataDto } from './dto/category.dto';
import { CategoryService } from './category.service';
import { updateCategoryDataDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    root(): void;
    createCategory(postData: categoryDataDto): Promise<import(".prisma/client").category>;
    list(): Promise<{
        data: import(".prisma/client").category[];
    }>;
    findOne(id: string): Promise<{
        data: import(".prisma/client").category;
    }>;
    update(id: string, postData: updateCategoryDataDto): Promise<import(".prisma/client").category>;
}
