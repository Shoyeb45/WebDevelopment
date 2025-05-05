import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
    const result = await prisma.users.create({ 
        data: {
            username, password, firstName, lastName
        }
    })
    console.log(result);
}

interface UpdateParams {
    firstName: string,
    lastName:  string
}


async function updateUser(username: string, {
    firstName,
    lastName
}: UpdateParams) {
  const result = await prisma.users.update({
    where: { username: username },
    data: {
        username, firstName, lastName
    }
  })
  console.log(result);
  
}

async function getUser(username: string) {
    const result = await prisma.users.findFirst({
        where: {
            username: username
        }
    });
    console.log(result);
    
}
// insertUser("Hammad12", "password", "Hammad", "Ansari");
// updateUser("Shoyeb", {firstName: "Mohammad", lastName: "Ansari"})

getUser("Hammad12");