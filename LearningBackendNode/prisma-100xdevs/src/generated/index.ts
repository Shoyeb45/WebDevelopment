import { PrismaClient } from "./prisma/client";

const prisma = new PrismaClient();

async function insertUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) {
  await prisma.$connect();

  const res = await prisma.user.create({
    data: { email, password, firstName, lastName },
  });
}

insertUser("shoyebff45@gmail.com", "password", "Shoyeb", "Ansari");
