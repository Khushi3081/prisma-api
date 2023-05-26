"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProduct(postData) {
        return this.prisma.product.create({
            data: {
                name: postData.productname,
                price: postData.productprice,
                quantity: postData.productquntity,
                c_id: parseInt(postData.c_id),
                sub_id: parseInt(postData.sub_id),
            },
        });
    }
    async showlist() {
        let data = await this.prisma.product.findMany({
            include: {
                subCategory: {
                    include: {
                        candidate: true,
                    },
                },
            },
        });
        return data;
    }
    async categoryfindAll() {
        const categories = await this.prisma.category.findMany({});
        return { category: categories };
    }
    async subfindAll(id) {
        const subcategories = await this.prisma.subCategory.findMany({
            where: {
                c_id: Number(id),
            },
        });
        return { subcategory: subcategories };
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map