import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
const saltRounds = 10;
const prisma = new PrismaClient();

async function data() {
  return await prisma.user.create
    // data: {
    //   name: 'Keyur',
    //   email: 'keyur@gmail.com',
    //   password: await bcrypt.hash('keyur', 10),
    // },
  // });
}
data();
