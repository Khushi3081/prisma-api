import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
const saltRounds = 10;
const prisma = new PrismaClient();

async function data() {
  return await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('admin@123', 10),
      google_provider_id: null,
      register_type: null,
      role_id: 1,
      created_at: new Date(),
    },
  });
}
data();
