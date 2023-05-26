"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function data() {
    return await prisma.role.create({
        data: {
            name: 'user',
        },
    });
}
data();
//# sourceMappingURL=role.seed.js.map