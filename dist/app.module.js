"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const role_module_1 = require("./role/role.module");
const auth_module_1 = require("./auth/auth.module");
const login_module_1 = require("./login/login.module");
const category_module_1 = require("./category/category.module");
const sub_category_module_1 = require("./sub-category/sub-category.module");
const product_module_1 = require("./product/product.module");
const forgot_password_module_1 = require("./forgot-password/forgot-password.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, role_module_1.RoleModule, auth_module_1.AuthModule, login_module_1.LoginModule, category_module_1.CategoryModule, sub_category_module_1.SubCategoryModule, product_module_1.ProductModule, forgot_password_module_1.ForgotPasswordModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map