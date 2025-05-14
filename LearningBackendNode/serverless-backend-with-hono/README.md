

# 🚫 Why Not Use Express with Cloudflare Workers?

## Reason 1: Express Heavily Relies on Node.js

Express is tightly coupled with Node.js APIs (like `http`, `stream`, etc.), which are not available in the Cloudflare Workers runtime.

🔗 [Community Discussion: Express Support for Workers](https://community.cloudflare.com/t/express-support-for-workers/390844)

![Express Limitation Screenshot](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F8c0620c6-3b41-468f-a76d-a34538aa78bb%2FScreenshot_2024-02-10_at_4.16.25_AM.jpg?table=block\&id=fbfb6e8b-2ec7-48e8-bac9-cdb9f4caa9a0\&cache=v2)

---

# 🗂 Structuring Your Handlers

You can modularize your routes/handlers in separate files and reuse them across:

* Express
* Hono
* Native Cloudflare Worker handlers

📌 Just forward requests to a shared handler function.

![Handler Screenshot 1](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fa683cec8-a81a-41cb-82b9-8a4b11c20101%2FScreenshot_2024-02-10_at_4.15.26_AM.jpg?table=block\&id=7bfd09ff-3394-4025-a28e-ebc064ce2332\&cache=v2)

![Handler Screenshot 2](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fd56c54ff-12ee-4b9e-bda6-699641b27bea%2FScreenshot_2024-02-10_at_4.37.24_AM.jpg?table=block\&id=44cd75c5-27b8-4e0b-bf94-d4c1bf546581\&cache=v2)

---

# ⚡ Using Hono with Cloudflare Workers

## What is Hono?

> Hono is a small, fast, and type-safe web framework for Cloudflare Workers, Bun, Deno, and more.

🔗 [Motivation & Intro](https://hono.dev/concepts/motivation)

![Hono Screenshot](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ff31ed7e5-5d53-40d5-81ef-f60e385a1867%2FScreenshot_2024-02-10_at_4.39.42_AM.jpg?table=block\&id=09120297-ab1f-4094-b610-acf9e71e9e16\&cache=v2)

---

## Supported Runtimes

Hono supports multiple runtimes including:

* Cloudflare Workers
* Bun
* Deno
* Node.js (via `fetch`-compatible APIs)

![Runtimes Screenshot](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F9d9b7350-fb08-49b8-82d1-cffc4c73a349%2FScreenshot_2024-02-10_at_4.40.01_AM.jpg?table=block\&id=5bf712cb-e458-40f2-a57f-a336d49faaed\&cache=v2)

---

## 🚀 Getting Started with Hono on Cloudflare Workers

### Step 1: Initialize a New App

```bash
npm create hono@latest my-app
```

### Step 2: Move Into the App Folder & Install Dependencies

```bash
cd my-app
npm install
```

### Step 3: Hello World Example

```js
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello Cloudflare Workers!'))

export default app
```

---

## 📥 Getting Inputs from User

```js
import { Hono } from 'hono'

const app = new Hono()

app.get('/', async (c) => {
  const body = await c.req.json()
  console.log(body)
  console.log(c.req.header("Authorization"))
  console.log(c.req.query("param"))

  return c.text('Hello Hono!')
})

export default app
```

🔗 [More Details](https://hono.dev/getting-started/cloudflare-workers)

---

## 📦 Deploying Your Hono App

1. Make sure you’re logged into Cloudflare:

```bash
wrangler login
```

2. Deploy the app:

```bash
npm run deploy
```

---

# 🔐 Using Middlewares in Hono

🔗 [Hono Middleware Guide](https://hono.dev/guides/middleware)

---

## 🛡 Creating a Simple Auth Middleware

```js
import { Hono } from 'hono'

const app = new Hono()

app.use(async (c, next) => {
  if (c.req.header("Authorization")) {
    // Validate token or key here
    await next()
  } else {
    return c.text("You don't have access")
  }
})

app.get('/', async (c) => {
  const body = await c.req.parseBody()
  console.log(body)
  console.log(c.req.header("Authorization"))
  console.log(c.req.query("param"))

  return c.json({ msg: "Access granted" })
})

export default app
```

💡 **Note:** You *must* return the response (`c.text()`, `c.json()`, etc.) from middleware to stop the request chain when unauthorized.

