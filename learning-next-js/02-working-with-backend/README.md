# Next.js Backend Capabilities
+
## Table of Contents

- [Backends in Next.js](#backends-in-nextjs)
- [Recap of Data Fetching in React](#recap-of-data-fetching-in-react)
- [Data Fetching In NextJS](#data-fetching-in-nextjs)
- [Loaders In NextJS](#loaders-in-nextjs)
- [Introducing API Routes In NextJS](#introducing-api-routes-in-nextjs)
- [Let's move the backend into our own app](#lets-move-the-backend-into-our-own-app)
- [Frontend for Signing up](#frontend-for-signing-up)
- [Backend for signing up](#backend-for-signing-up)

---

## Backends in Next.js

Next.js is often referred to as a full-stack framework, meaning it can handle both frontend and backend code within the same codebase. This is a powerful feature that sets Next.js apart from traditional frontend frameworks like React.

### 1. Single Codebase for Frontend and Backend

One of the key advantages of using Next.js for backend development is the ability to have a single codebase for both your frontend and backend code. This approach simplifies the development process and reduces the overhead of managing separate codebases for the frontend and backend.

By having a unified codebase, developers can easily share code, utilities, and logic between the frontend and backend components of their application. This promotes code reusability and consistency, making it easier to maintain and scale the codebase over time.

![Next.js Architecture](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F95e985d8-f71e-4ed8-a99c-f813f6b92450%2FUntitled.png?table=block&id=ec6b6cba-5573-4d11-8601-e39790fcc64d&cache=v2)

### 2. No CORS Issues, Single Domain Name

In traditional web development setups, where the frontend and backend are separate entities, developers often encounter Cross-Origin Resource Sharing (CORS) issues. CORS is a security mechanism that restricts cross-origin requests from one domain to another, which can cause problems when the frontend and backend are hosted on different domains.

With Next.js, since both the frontend and backend are part of the same codebase and deployed together, there is no need to worry about CORS issues. All requests from the frontend to the backend are treated as same-origin requests, eliminating the need for complex CORS configurations.

Additionally, having a single codebase means that your frontend and backend can share the same domain name, further simplifying the deployment and hosting process.

### 3. Ease of Deployment

Another significant advantage of using Next.js as a full-stack framework is the ease of deployment. Since the frontend and backend code are part of the same codebase, you can deploy the entire application as a single unit.

Next.js provides built-in support for various deployment platforms, such as Vercel (the company behind Next.js), Netlify, and AWS Amplify, among others. These platforms offer seamless deployment workflows, making it easy to deploy your Next.js application with minimal configuration.

Furthermore, Next.js supports serverless deployment, which means you can deploy your backend code as serverless functions, taking advantage of the scalability and cost-effectiveness of serverless architectures.

---

## Recap of Data Fetching in React

In traditional React applications, data fetching typically happens on the client-side using hooks like `useEffect` or libraries like Axios or Fetch API. Here's a common approach to fetch data from an API endpoint:

### 1. Create a React component:

```jsx
import React, { useState, useEffect } from 'react';

const UserCard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserCard;
```

### 2. Use the `useEffect` hook to fetch data:

- The `useEffect` hook is used to perform side effects in React components, such as fetching data from an API.
- In the example above, the `useEffect` hook is called when the component mounts, and it fetches user data from the provided API endpoint using the `fetch` function.

### 3. Handle the response and update state:

- Once the API response is received, the `json()` method is used to parse the response data.
- The parsed data is then stored in the component's state using the `setUser` function provided by the `useState` hook.

### 4. Render the user data:

- The component renders a loading message if the `user` state is `null` (i.e., data is still being fetched).
- Once the `user` state is updated with the fetched data, the component renders the user's name and email.

By following this approach, you can fetch data from an API endpoint and display it in your React component. However, it's important to note that this method of data fetching happens on the **client-side**, which means the initial page load may not have the user data available, potentially affecting the user experience and search engine optimization (SEO).

---

## Data Fetching In NextJS

Next.js provides alternative approaches for data fetching, such as Server-Side Rendering (SSR) and Static Site Generation (SSG), which can improve the initial page load performance and SEO. We'll explore these approaches in the upcoming sections.

### 1. Initialize an Empty Next.js Project

First, we need to create a new Next.js project using the `create-next-app` command:

```bash
npx create-next-app@latest my-next-app
```

### 2. Install Axios

Next, we'll install the Axios library, which we'll use to make HTTP requests:

```bash
cd my-next-app
npm install axios
```

### 3. Clean Up the Initial Files

Let's clean up the initial files by removing everything from `pages/index.js` and `styles/globals.css`.

### 4. Fetch User Details

In the `pages/index.js` file, we'll create an async function to fetch the user details from the provided API endpoint:

```jsx
import axios from 'axios';

async function getUserDetails() {
  const response = await axios.get('https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details');
  return response.data;
}
```

### 5. Create an Async Component

Next.js supports async components, which means we can directly export an async function as the default component:

```jsx
import axios from 'axios';

async function getUserDetails() {
  const response = await axios.get('https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details');
  return response.data;
}

export default async function Home() {
  const userData = await getUserDetails();

  return (
    <div>
      {userData.email}
      {userData.name}
    </div>
  );
}
```

In this example, the `getUserDetails` function fetches the user details from the API, and the `Home` component renders the user's email and name.

### 6. Check the Network Tab

If you start the development server (`npm run dev`) and visit `http://localhost:3000`, you should see the user's email and name rendered on the page. Additionally, if you open the browser's network tab, you should not see any waterfalling effect, as the data is fetched and rendered on the server-side.

### 7. Prettify the UI

To improve the visual appearance of the page, we can add some styling using Tailwind CSS:

```jsx
import axios from 'axios';

async function getUserDetails() {
  const response = await axios.get('https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details');
  return response.data;
}

export default async function Home() {
  const userData = await getUserDetails();

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>
            Name: {userData?.name}
          </div>
          {userData?.email}
        </div>
      </div>
    </div>
  );
}
```

This code centers the user details vertically and horizontally on the page, adds a border and padding to the container, and displays the user's name and email.

### 8. Loader

In this example, we don't need a separate loader component because the page is rendered on the server-side, and the user will only see the content once it's fully rendered. However, if you need to show a loading state for more complex scenarios, you can use React's Suspense and fallback components.

> **Note:** By following this approach, you can fetch data on the server-side in Next.js, pre-render the page with the fetched data, and provide a better user experience with improved performance and SEO optimization.

---

## Loaders In NextJS

In Next.js, you can define a `loading.tsx` file (or `loading.js` for JavaScript) in the same directory as your page component. This file will be used to render a loading state while the page's async operations, such as data fetching, are in progress.

Here's how you can implement a custom loader in Next.js:

### 1. Create a `loading.tsx` file

In the root directory of your Next.js project, create a new file called `loading.tsx` and add a custom loader component:

```tsx
// loading.tsx
export default function Loading() {
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    </div>
  );
}
```

In this example, we're rendering a spinning loader using Tailwind CSS utility classes. You can customize the loader component according to your design requirements.

### 2. Update the `Home` component

Next, update the `Home` component in `pages/index.tsx` to use the `Loading` component while fetching data:

```tsx
import axios from 'axios';

async function getUserDetails() {
  // Simulate a slow API call
  await new Promise(resolve => setTimeout(resolve, 5000));
  const response = await axios.get('https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details');
  return response.data;
}

export default async function Home() {
  const userData = await getUserDetails();

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>
            Name: {userData?.name}
          </div>
          {userData?.email}
        </div>
      </div>
    </div>
  );
}
```

In this example, we've added a simulated delay of 5 seconds to the `getUserDetails` function to mimic a slow API call.

### 3. Start the development server

Run the development server with the following command:

```bash
npm run dev
```

When you visit `http://localhost:3000`, you should see the custom loader component rendered while the data is being fetched. After 5 seconds, the user details will be displayed.

> **Note:** By defining a `loading.tsx` file, Next.js automatically renders the `Loading` component while the page's async operations are in progress. This provides a better user experience by showing a loading state instead of a blank page while data is being fetched.

---

## Introducing API Routes In NextJS

Next.js provides a powerful feature called API Routes, which allows you to create server-side APIs directly within your Next.js application. This feature makes Next.js a full-stack framework, enabling you to build both the frontend and backend components of your application in a single codebase.

### Benefits of Using Next.js for Backend

1. **Single Repository**: By having both the frontend and backend code in the same repository, you can streamline your development workflow and simplify collaboration between frontend and backend developers.

2. **Standard Backend Features**: Next.js API Routes provide similar functionality to popular backend frameworks like Express.js, allowing you to handle HTTP requests, define routes, and perform server-side operations.

3. **Direct Communication with Server Components**: Server components in Next.js can directly communicate with the backend API routes, eliminating the need for cross-origin requests (CORS) and simplifying the development process.

### Creating an API Route

To create an API route in Next.js, you need to create a file inside the `pages/api` directory. The file name will determine the route path. For example, if you create a file named `pages/api/hello.js`, the corresponding route will be `/api/hello`.

Here's an example of a simple API route in Next.js:

```javascript
// pages/api/hello.js

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello, world!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
```

In this example, the `handler` function receives the `req` (request) and `res` (response) objects, similar to Express.js. You can handle different HTTP methods (GET, POST, PUT, DELETE, etc.) and perform server-side operations accordingly.

To access this API route, you can send a GET request to `http://localhost:3000/api/hello` (during development) or `https://your-domain.com/api/hello` (in production).

### Accessing API Routes from Server Components

One of the benefits of using Next.js API routes is the ability to directly access them from server components. This eliminates the need for cross-origin requests (CORS) and simplifies the development process.

Here's an example of how you can fetch data from an API route in a server component:

```javascript
// pages/index.js

export default async function Home() {
  const res = await fetch('/api/hello');
  const data = await res.json();

  return (
    <div>
      <h1>{data.message}</h1>
    </div>
  );
}
```

In this example, the `Home` component fetches data from the `/api/hello` route using the `fetch` function. Since the API route is part of the same Next.js application, there's no need to worry about CORS or cross-origin requests.

---

## Let's move the backend into our own app

### 1. Create the API folder

First, create a new folder called `api` inside the `pages` directory. This is where we'll define our API routes.

```
app/
├── api/
└── index.tsx
```

### 2. Create the user folder and route file

Inside the `api` folder, create a new folder called `user`. This folder will contain routes related to user data. Then, create a new file called `route.ts` inside the `user` folder.

```
app/
├── api/
│   └── user/
│       └── route.ts
└── index.tsx
```

### 3. Define the GET route

Open the `route.ts` file and define a GET route that returns hardcoded user details:

```typescript
// app/api/user/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    username: 'harkirat',
    email: 'harkirat@gmail.com',
  });
}
```

In this example, we're using the `NextResponse` utility from Next.js to send a JSON response with hardcoded user details.

### 4. Update the `getUserDetails` function

Now, update the `getUserDetails` function in `pages/index.tsx` to fetch data from the new API route:

```typescript
// pages/index.tsx
import axios from 'axios';

async function getUserDetails() {
  try {
    const response = await axios.get('http://localhost:3000/api/user');
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export default async function Home() {
  const userData = await getUserDetails();

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>
            Name: {userData?.username}
          </div>
          {userData?.email}
        </div>
      </div>
    </div>
  );
}
```

In this updated code, we're using Axios to fetch data from the `http://localhost:3000/api/user` route, which corresponds to the API route we defined earlier.

### 5. Start the development server

Run the development server with the following command:

```bash
npm run dev
```

When you visit `http://localhost:3000`, you should see the hardcoded user details rendered on the page.

> **Note:** By creating an API route within our Next.js app, we've moved the backend logic into our application. This approach allows us to have a unified codebase for both the frontend and backend components, simplifying development and deployment.

---

## Frontend for Signing up

### Create the Sign Up Page

First, create a new file called `page.tsx` inside the `app/signup` directory. This file will render the Sign Up component.

```typescript
// app/signup/page.tsx
import { Signup } from "@/components/Signup";

export default function SignUpPage() {
  return <Signup />;
}
```

### Create the Sign Up Component

Next, create a new file called `Signup.tsx` inside the `components` directory. This file will contain the Sign Up component.

```typescript
// components/Signup.tsx
"use client"; // Mark this component as a client component
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEventHandler, useState } from "react";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
          <div>
            <div className="px-10">
              <div className="text-3xl font-extrabold">Sign up</div>
            </div>
            <div className="pt-2">
              <LabelledInput
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                label="Username"
                placeholder="harkirat@gmail.com"
              />
              <LabelledInput
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                label="Password"
                type={"password"}
                placeholder="123456"
              />
              <button
                onClick={async () => {
                  const response = await axios.post("http://localhost:3000/api/user", {
                    username,
                    password,
                  });
                  router.push("/");
                }}
                type="button"
                className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
```

In this component, we're using the `useState` hook to manage the state of the username and password fields. We're also using the `useRouter` hook from Next.js to navigate to the landing page (`/`) after a successful sign-up.

The `Signup` component renders a form with two input fields (username and password) and a "Sign up" button. When the user clicks the "Sign up" button, an `onClick` handler is triggered, which sends a POST request to the `/api/user` route with the username and password data.

If the sign-up is successful, the user is redirected to the landing page (`/`) using the `router.push` method.

### Create the Backend Route

Now, let's create the backend route to handle the sign-up request. Inside the `app/api/user` directory, create a new file called `route.ts` (or `route.js` for JavaScript).

```typescript
// app/api/user/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Here, you would typically perform validation and store the user data in a database
  // For simplicity, we'll just log the username and password to the console
  console.log('Username:', username);
  console.log('Password:', password);

  return NextResponse.json({ message: 'Sign up successful' });
}
```

In this example, we're defining a POST route that accepts the username and password data from the client. In a real-world scenario, you would typically perform validation and store the user data in a database. For simplicity, we're just logging the username and password to the console.

> **Note:** After implementing the backend route, you should be able to sign up by entering a username and password on the Sign Up page. When you click the "Sign up" button, you should see the username and password logged in the console, and you should be redirected to the landing page (`/`).

---

## Backend for signing up

### 1. Navigate to the API Route File

First, navigate to the `app/api/user/route.ts` file. This is where we'll define our API routes related to user authentication.

### 2. Import Required Dependencies

At the top of the file, import the necessary dependencies from Next.js:

```typescript
import { NextRequest, NextResponse } from 'next/server';
```

### 3. Define the POST Route

Next, define the POST route by exporting an async function named `POST`. This function will handle the incoming POST requests to the `/api/user` route.

```typescript
export async function POST(req: NextRequest) {
  const body = await req.json();

  return NextResponse.json({ username: body.username, password: body.password });
}
```

In this code:

- The `POST` function receives a `NextRequest` object (`req`) as a parameter, which represents the incoming HTTP request.
- We use the `req.json()` method to parse the request body as JSON data and store it in the `body` variable.
- Finally, we return a `NextResponse` object with the `username` and `password` properties from the request body as JSON data.

Here's the complete `app/api/user/route.ts` file:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  return NextResponse.json({ username: body.username, password: body.password });
}
```

With this implementation, when a POST request is sent to the `/api/user` route with a JSON payload containing `username` and `password` properties, the server will respond with a JSON object containing the same `username` and `password` values.

**Example Request:**

```json
{
  "username": "example@email.com",
  "password": "mypassword"
}
```

**Example Response:**

```json
{
  "username": "example@email.com",
  "password": "mypassword"
}
```

---

## Conclusion

To conclude, in the next lecture, we will dive deeper into building full-stack applications with Next.js. We will explore integrating databases, implementing better fetching techniques, using the Prisma ORM, and leveraging server-side capabilities. This will equip us with the knowledge and skills necessary to build robust, scalable, and secure full-stack applications using Next.js.




## Databases

Next.js is a full-stack framework that allows you to build both the frontend and backend components of your application within a single codebase. While Next.js provides built-in support for server-side rendering (SSR) and API routes, it doesn't include a database solution out of the box. This is where third-party tools like Prisma come into play.

![Database Integration Diagram](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F40c52545-0b30-428c-9cc6-a59b22e93396%2FUntitled.png?table=block&id=3ce64dcd-77f9-4fea-9a9e-83d634c652bd&cache=v2)

### Setting up Prisma

1. **Install Prisma**

   First, we need to install the Prisma package in our Next.js project:

   ```bash
   npm install prisma
   ```

2. **Initialize Prisma Schema**

   Next, we need to initialize the Prisma schema, which defines the structure of our database:

   ```bash
   npx prisma init
   ```

   This command will create a new directory called `prisma` with a `schema.prisma` file inside it.

3. **Define the User Model**

   Open the `schema.prisma` file and define a simple `User` model:

   ```prisma
   model User {
     id        Int     @id @default(autoincrement())
     username  String  @unique
     password  String
   }
   ```

   This model defines a `User` table with three fields: `id` (auto-incrementing primary key), `username` (unique string), and `password` (string).

   > For starting a PostgreSQL instance, you can check out PlanetScale, Neon.tech, and Aiven, which are managed database providers that offer PostgreSQL as a service.

4. **Configure the Database Connection**

   Replace the `DATABASE_URL` value in the `.env` file with your PostgreSQL database connection URL:

   ```env
   DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
   ```

   Make sure to replace the placeholders with your actual database credentials.

5. **Migrate the Database**

   Run the following command to create the initial migration and apply it to your database:

   ```bash
   npx prisma migrate dev --name init_schema
   ```

   This command will create a new migration file and apply the changes to your database.

6. **Generate the Prisma Client**

   Next, we need to generate the Prisma client, which provides an interface to interact with our database:

   ```bash
   npx prisma generate
   ```

   This command will generate the Prisma client based on the defined models in the `schema.prisma` file.

7. **Update the Sign Up Route**

   Now, let's update the sign-up route in `app/api/user/route.ts` to store user data in the database:

   ```typescript
   import { NextRequest, NextResponse } from 'next/server';
   import { prisma } from '@/lib/prisma'; // Import the Prisma client

   export async function POST(req: NextRequest) {
     const body = await req.json();
     // Add validation logic here (e.g., using Zod)

     const user = await prisma.user.create({
       data: {
         username: body.username,
         password: body.password,
       },
     });

     console.log(user.id);

     return NextResponse.json({ message: 'Signed up' });
   }
   ```

   In this updated code, we import the Prisma client and use the `prisma.user.create` method to create a new user in the database with the provided `username` and `password`.

8. **Update the GET Endpoint**

   We can also update the GET endpoint to retrieve user data from the database:

   ```typescript
   import { NextResponse } from 'next/server';
   import { prisma } from '@/lib/prisma';

   export async function GET() {
     const user = await prisma.user.findFirst({});
     return NextResponse.json({ name: user?.username, email: user?.username });
   }
   ```

   In this example, we use the `prisma.user.findFirst` method to retrieve the first user from the database and return their `username` as both the `name` and `email` properties.

## Better Fetches

In the previous implementation, we were fetching user details by making an HTTP request to our API route (`/api/user`). While this approach works, it introduces an unnecessary network round-trip, as we're sending a request from the server back to the server itself.

A better solution is to directly interact with the database from our server component, eliminating the need for an API route and reducing the overhead of making an HTTP request.

Here's how we can implement this better solution:

1. **Import the Prisma Client**

   First, we need to import the Prisma client from the `@prisma/client` package:

   ```typescript
   import { PrismaClient } from "@prisma/client";
   ```

2. **Create a Prisma Client Instance**

   Next, we create a new instance of the Prisma client:

   ```typescript
   const client = new PrismaClient();
   ```

3. **Update the `getUserDetails` Function**

   Now, we can update the `getUserDetails` function to directly interact with the database using the Prisma client:

   ```typescript
   async function getUserDetails() {
     try {
       const user = await client.user.findFirst({});
       return {
         name: user?.username,
         email: user?.username,
       };
     } catch (e) {
       console.log(e);
     }
   }
   ```

   In this updated function, we use the `client.user.findFirst` method to retrieve the first user from the database. We then return an object containing the `name` and `email` properties, which are derived from the `username` field of the retrieved user.

   ![Better Fetching Diagram](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F5d556c05-e637-46c4-9e36-48b7ccef65f9%2FUntitled.png?table=block&id=2227a9e2-7a1b-4ae7-b919-c94517999939&cache=v2)

4. **Keep the `Home` Component Unchanged**

   The `Home` component remains unchanged, as it still receives the user data from the `getUserDetails` function:

   ```typescript
   export default async function Home() {
     const userData = await getUserDetails();

     return (
       <div className="flex flex-col justify-center h-screen">
         <div className="flex justify-center">
           <div className="border p-8 rounded">
             <div>Name: {userData?.name}</div>
             {userData?.email}
           </div>
         </div>
       </div>
     );
   }
   ```

   > By directly interacting with the database from our server component, we eliminate the need for an API route and the overhead of making an HTTP request. This approach is more efficient and reduces the overall complexity of our application.

## Singleton Prisma Client

### Why a Singleton Prisma Client?

In a Next.js development environment, the `next dev` command clears the Node.js cache on each run. This behavior can lead to the creation of multiple instances of the Prisma client due to hot reloading, which can quickly exhaust the database connections, as each Prisma client instance holds its own connection pool.

To avoid this issue, it's recommended to create a singleton instance of the Prisma client, ensuring that only one instance is created and reused throughout the application's lifecycle.

### Creating the Singleton Prisma Client

1. **Create a `db/index.ts` file**

   First, create a new file called `index.ts` inside a `db` directory at the root of your project.

2. **Import the Prisma Client**

   Import the `PrismaClient` from the `@prisma/client` package:

   ```typescript
   import { PrismaClient } from '@prisma/client';
   ```

3. **Define a function to create the Prisma Client instance**

   Define a function `prismaClientSingleton` that creates a new instance of the Prisma client:

   ```typescript
   const prismaClientSingleton = () => {
     return new PrismaClient();
   };
   ```

4. **Declare a global variable for the Prisma client**

   Declare a global variable `prisma` that will hold the singleton instance of the Prisma client:

   ```typescript
   declare global {
     var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
   }
   ```

5. **Create the singleton instance**

   Create the singleton instance by checking if the `prisma` global variable is already defined. If not, call the `prismaClientSingleton` function to create a new instance:

   ```typescript
   const prisma = globalThis.prisma ?? prismaClientSingleton();
   ```

6. **Assign the instance to the global variable (development only)**

   In the development environment, assign the created instance to the `prisma` global variable to ensure it's reused across hot reloads:

   ```typescript
   if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
   ```

7. **Export the singleton instance**

   Finally, export the `prisma` instance as the default export:

   ```typescript
   export default prisma;
   ```

   Here's the complete `db/index.ts` file:

   ```typescript
   import { PrismaClient } from '@prisma/client';

   const prismaClientSingleton = () => {
     return new PrismaClient();
   };

   declare global {
     var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
   }

   const prisma = globalThis.prisma ?? prismaClientSingleton();

   export default prisma;

   if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
   ```

### Updating Prisma Client Imports

After creating the singleton instance, you need to update all imports of the Prisma client throughout your application to use the singleton instance from the `db/index.ts` file:

```typescript
import client from '@/db';
```

> By following this approach, you ensure that only a single instance of the Prisma client is created and reused throughout your Next.js application, preventing the exhaustion of database connections and improving overall performance and stability.

## Server Actions

Server Actions are a powerful feature introduced in Next.js 13 that allow you to execute server-side code directly from your components, without the need for creating dedicated API routes. This can simplify your codebase and improve developer experience by providing a more intuitive way to handle data mutations and form submissions.

Here's how you can implement Server Actions in your Next.js application:

1. **Create an Actions File**

   First, create a new file called `actions/user.ts` (or any other appropriate name and location) to define your Server Actions.

   ```typescript
   // actions/user.ts
   "use server"; // This directive marks the file as containing Server Actions

   import client from "@/db";

   export async function signup(username: string, password: string) {
     // You can add validation logic here (e.g., using Zod)
     const user = await client.user.create({
       data: {
         username,
         password,
       },
     });

     console.log(user.id);

     return "Signed up!";
   }
   ```

   In this example, we define a `signup` function that takes `username` and `password` as input, creates a new user in the database using the Prisma client, and returns a success message.

2. **Update the Sign Up Component**

   Next, update your `Signup` component to use the `signup` Server Action instead of making an API request.

   ```typescript
   // components/Signup.tsx
   "use client"; // Mark this component as a client component

   import { signup } from "@/actions/user";
   import { useRouter } from "next/router";
   import { ChangeEventHandler, useState } from "react";

   export function Signup() {
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const router = useRouter();

     return (
       <div className="h-screen flex justify-center flex-col">
         {/* ... */}
         <button
           onClick={async () => {
             const response = await signup(username, password);
             localStorage.setItem("token", response);
             router.push("/");
           }}
           type="button"
           className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
         >
           Sign up
         </button>
       </div>
     );
   }
   ```

   In this updated component, we import the `signup` Server Action and call it when the user clicks the "Sign up" button. The response from the Server Action is stored in `localStorage` as a token, and the user is redirected to the home page (`/`).

3. **Check the Network Tab**

   When you run your application and sign up with a new username and password, you should see the user's ID logged in the console, and the network tab should not show any API requests. Instead, the Server Action is executed on the server, and the response is returned directly to the client component.

   ![Server Actions Network Tab](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F24ea4118-92a7-4344-afdc-f6f229ffc2d2%2FUntitled.png?table=block&id=5d52a1dd-8ed0-4853-93fe-eae131733d13&cache=v2)

### Benefits of Server Actions

Using Server Actions in your Next.js application provides several benefits:

1. **Single Function for Client and Server Components**: Server Actions can be used in both client and server components, reducing code duplication and improving consistency.

2. **Typed Responses**: Server Actions provide typed responses on the frontend, similar to tools like tRPC, improving type safety and developer experience.

3. **Seamless Form Integration**: Server Actions can be seamlessly integrated with forms, simplifying the process of handling form submissions and data mutations.

4. **Improved Security**: Server Actions execute on the server, reducing the risk of client-side vulnerabilities and providing better security for sensitive operations.

5. **Simplified Development**: By eliminating the need for dedicated API routes, Server Actions can simplify your codebase and improve developer productivity.

However, it's important to note that Server Actions still rely on HTTP requests under the hood, but they provide a more intuitive and streamlined developer experience by abstracting away the complexities of creating and managing API routes.