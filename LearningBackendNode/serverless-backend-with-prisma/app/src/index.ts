import { Hono, Next } from 'hono'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'

const app = new Hono()


app.post('/users', async (c) => {
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
  const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate())
  const result = await prisma.user.findMany({});
  return c.json({
    "msg": "get all users", 
    result
  })
})

app.post('/', async (c) => {
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)
  const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate())
  // Todo: add Zod validation here
  const body = await c.req.json()


  // console.log(body)

  const res = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password
    }
  })

  return c.json({
    msg: "User created",
    result: res
  })
})

export default app