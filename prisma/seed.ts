// import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { prisma } from './index.js';
import { env } from "../lib/env.js";

async function main() {
    const { ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD } = env;
    if (!ADMIN_EMAIL || !ADMIN_NAME || !ADMIN_PASSWORD) {
      throw new Error('Please provide ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in .env file');
    }

    const existingAdmin = await prisma.user.findFirst({
      where: {
        email: ADMIN_EMAIL,
        role: "ADMIN",
      },
    });

    if (existingAdmin) {
        console.log(`User with email ${ADMIN_EMAIL} already exists. Skipping creation.`);
        return;
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

   try {
      const newAdmin = await prisma.user.create({
         data: {
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            password: hashedPassword,
            role: "ADMIN",	
            emailVerified: new Date(),
         },
      });

      console.log(`✅ Admin user created: ${newAdmin.email}`);
    } catch (error) {
      console.error('Could not create Admin...')
   }
}

main()
  .catch((error) => {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });