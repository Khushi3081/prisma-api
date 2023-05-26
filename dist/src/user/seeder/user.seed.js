"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const saltRounds = 10;
const prisma = new client_1.PrismaClient();
async function data() {
    return await prisma.user.create;
}
data();
//# sourceMappingURL=user.seed.js.map