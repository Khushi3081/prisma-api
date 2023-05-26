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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
let AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(postData) {
        const hashPass = await bcrypt.hash(postData.password, saltRounds);
        postData.password = hashPass;
        return this.prisma.user.create({
            data: {
                name: postData.name,
                email: postData.email,
                password: postData.password,
                googleProviderId: 'null',
                registerType: 'Platform',
            },
        });
    }
    async googleRegister(req) {
        try {
            console.log(req.user);
            let fname = req.user.name.familyName;
            let lname = req.user.name.givenName;
            let name = fname + lname;
            if (!req.user) {
                return `no user from Google`;
            }
            else {
                await this.prisma.user.create({
                    data: {
                        name: name,
                        email: req.user.emails[0].value,
                        password: req.user.password,
                        googleProviderId: req.user.id,
                        registerType: req.user.provider,
                        role_id: 2
                    },
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map