

# 🖥️ What are Backend Servers?

![Backend Server Illustration](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fa242503e-ad8f-4ea1-879b-0dfb70455cda%2FScreenshot_2024-02-10_at_2.34.36_AM.jpg?table=block\&id=a6da43e6-4c09-4a26-862e-89c79720d413\&cache=v2)

* You might’ve used `express` to create a backend server.
* Typically, you run it using:

```bash
node index.js
```

This starts a process on a specific port (e.g., `3000`).

### 🌍 Deploying Backend on the Internet

There are several options:

1. Go to AWS, GCP, Azure, or Cloudflare.
2. Rent a VM (Virtual Machine) and deploy your app.
3. Use auto-scaling groups.
4. Deploy in a Kubernetes cluster.

### ⚠️ Downsides

1. You have to manage **how and when to scale**.
2. There’s a **base cost** even if no one visits your website.
3. You need to **monitor** to ensure no server is down.

---

# ☁️ What are Serverless Backends?

> Serverless is a deployment model where the **cloud provider dynamically manages** the allocation and provisioning of servers.

> 🧠 Serverless ≠ No Servers
> It means **you don't have to manage the servers**.

---

### ✨ Easier Definition

Imagine you could just write your `express` routes and run a command. The app would:

1. **Deploy Automatically**
2. **Auto-scale Based on Traffic**
3. **Charge You Per Request** (instead of paying for VMs)

---

### ❗ Problems with Serverless

1. **More expensive at scale**
2. **Cold start problem** – Slight delay when a function is invoked after inactivity

---

# 🚀 Famous Serverless Providers

### ✅ [AWS Lambda](https://aws.amazon.com/pm/lambda/?trk=5cc83e4b-8a6e-4976-92ff-7a6198f2fe76&sc_channel=ps)

### ✅ [Google Cloud Functions](https://firebase.google.com/docs/functions)

### ✅ [Cloudflare Workers](https://workers.cloudflare.com/)

![Serverless Providers Comparison](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F863715ea-b0ef-40c0-b446-e45704d73d07%2FScreenshot_2024-02-10_at_2.48.34_AM.jpg?table=block\&id=621a9360-0dc0-4d63-95e7-53681ace6195\&cache=v2)

---

# 📌 When Should You Use Serverless?

1. Need to get started **quickly without worrying** about deployments
2. **Unpredictable traffic** patterns
3. **Very low traffic** and cost optimization is a priority

---

# 🔧 Cloudflare Workers Setup

We're using **Cloudflare Workers** because:

* No credit card needed
* Fast and easy to use

👉 Sign up at [https://cloudflare.com/](https://cloudflare.com/)

![Cloudflare UI](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F037e37e8-1371-4e14-932f-fc7d170dd1c9%2FScreenshot_2024-02-10_at_2.52.07_AM.jpg?table=block\&id=0f94d6df-24f6-439e-815d-06b8f0bf9130\&cache=v2)

Create a test worker via the UI and try accessing the deployed URL.

---

# ⚙️ How Cloudflare Workers Work

📖 [Official Blog](https://developers.cloudflare.com/workers/reference/how-workers-works)

💡 **Cloudflare Workers don’t use Node.js runtime**. They use a custom-built runtime, which lacks some Node.js features.

![Cloudflare Runtime](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F34612f53-8340-455b-9ea5-a7ecbfed76e7%2FScreenshot_2024-02-10_at_3.51.07_AM.jpg?table=block\&id=05510132-8f7d-448b-bd2a-0a03319c647f\&cache=v2)

---

## 🆚 Isolates vs Containers

![Isolates vs Containers](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Feac4cf16-3350-4f8b-aa6e-98322a23d7fa%2FScreenshot_2024-02-10_at_3.54.02_AM.jpg?table=block\&id=dde817ce-f77f-4a17-add4-f8297d8107fe\&cache=v2)

---

# 🛠️ Initializing a Worker

```bash
npm create cloudflare -- my-app
```

> Select `no` when asked: "Do you want to deploy your application?"

### package.json

```json
"wrangler": "^3.0.0"
```

Notice: No `express` dependency here.

### Start Worker Locally

```bash
npm run dev
```

### Return JSON from Worker

```ts
export default {
  async fetch(request: Request): Promise<Response> {
    return Response.json({ message: "hi" });
  },
};
```

---

## ❓ Where is the Express Code?

Cloudflare **automatically manages** the HTTP server. You only write the logic to handle requests.

## ❓ How to Handle Routing?

### Express Routing (traditional):

```ts
app.get("/route", (req, res) => {
  // ...
});
```

### Cloudflare Workers Equivalent:

```ts
export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method === "GET") {
      return Response.json({ message: "you sent a get request" });
    } else {
      return Response.json({ message: "you did not send a get request" });
    }
  },
};
```

### 📌 Query Params:

Guide – [Parse URL Query Strings](https://community.cloudflare.com/t/parse-url-query-strings-with-cloudflare-workers/90286)

---

# 🚀 Deploying a Worker

We’ll use [`wrangler`](https://developers.cloudflare.com/workers/wrangler/) CLI.

![Wrangler Setup](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fede31e52-2585-4793-ae31-646e4011419b%2FScreenshot_2024-02-10_at_3.58.30_AM.jpg?table=block\&id=dcd69cc6-23b5-4435-bad4-c64f959adef9\&cache=v2)

---

### Step 1: Login to Cloudflare

```bash
npx wrangler login
```

![Login Screenshot](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ffa81c66a-188f-4a71-91a6-b7421430a811%2FScreenshot_2024-02-10_at_3.58.51_AM.jpg?table=block\&id=f98b270f-48d4-44d5-bbf7-b0cf93758d18\&cache=v2)

---

### Step 2: Deploy Your Worker

```bash
npm run deploy
```

If successful, your app is now live!

---

### 🌐 Assigning a Custom Domain

> Requires a **paid plan** and domain hosted on Cloudflare.

![Domain Setup](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F2cde6fd6-3b5e-40db-92dd-8dd42d78072b%2FScreenshot_2024-02-10_at_4.06.21_AM.jpg?table=block\&id=48d79027-bffe-4c5a-a308-582671ab0098\&cache=v2)

---

