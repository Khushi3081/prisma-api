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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryController = void 0;
const common_1 = require("@nestjs/common");
const sub_category_service_1 = require("./sub-category.service");
const create_sub_category_dto_1 = require("./dto/create-sub-category.dto");
const update_sub_category_dto_1 = require("./dto/update-sub-category.dto");
const product_service_1 = require("../product/product.service");
let SubCategoryController = class SubCategoryController {
    constructor(subCategoryService, productService) {
        this.subCategoryService = subCategoryService;
        this.productService = productService;
    }
    async subCategory() {
        return await this.subCategoryService.findAll();
    }
    async create(postData) {
        return this.subCategoryService.createSubCategory(postData);
    }
    async list() {
        let data = await this.productService.showlist();
        return { data: data };
    }
    async findOne(id) {
        let data1 = await this.subCategoryService.findAll();
        let data = await this.subCategoryService.findOne(+id);
        return { data: data, data1: data1 };
    }
    update(id, postData) {
        return this.subCategoryService.update(+id, postData);
    }
    remove(id) {
        return this.subCategoryService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.Render)('subCategory'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "subCategory", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.Redirect)('sub-category/sub-list'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sub_category_dto_1.CreateSubCategoryDto]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('sub-list'),
    (0, common_1.Render)('sub-category-list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Render)('update-subCategory'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubCategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sub_category_dto_1.UpdateSubCategoryDto]),
    __metadata("design:returntype", void 0)
], SubCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubCategoryController.prototype, "remove", null);
SubCategoryController = __decorate([
    (0, common_1.Controller)('sub-category'),
    __metadata("design:paramtypes", [sub_category_service_1.SubCategoryService,
        product_service_1.ProductService])
], SubCategoryController);
exports.SubCategoryController = SubCategoryController;
//# sourceMappingURL=sub-category.controller.js.map