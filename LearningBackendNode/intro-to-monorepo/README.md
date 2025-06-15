
# 🧱 Monorepo with Turborepo for Full-Stack Projects

---

## 📌 What is a Monorepo?

A **monorepo** is a single repository that holds the code for multiple projects (packages), often including:

* `frontend` (e.g., Next.js, React)
* `backend` (e.g., Express, NestJS)
* `common` (shared logic, types, validation schemas)

---

## ⚡ What is Turborepo?

**Turborepo** is a high-performance build system for JavaScript and TypeScript monorepos built by Vercel. It helps:

* Run tasks in parallel
* Cache builds
* Share code efficiently
* Use pipelines to reduce work

---

## 🏗️ Folder Structure

Example:

```bash
my-turbo-monorepo/
├── apps/
│   ├── frontend/      # Next.js app or any frontend
│   └── backend/       # Express/NestJS backend
├── packages/
│   └── common/        # Shared Zod schemas, types, utils
├── turbo.json         # Turborepo pipeline config
├── package.json       # Root package.json
└── tsconfig.json      # Base TS config
```

---

## 🔧 Step-by-Step Setup

---

### 1. 🧱 Initialize the Monorepo

```bash
npx create-turbo@latest
```

Choose:

* **Basic** starter
* **pnpm** or **yarn** workspace (recommended)

### 2. 📦 Set Up Workspaces

```json
// root package.json
{
  "name": "my-turbo-monorepo",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build"
  },
  "devDependencies": {
    "turbo": "^1.13.0"
  }
}
```

---

### 3. 📁 Create Projects

#### Frontend

```bash
cd apps
npx create-next-app frontend
```

#### Backend

```bash
mkdir backend
npm init -y
# Add Express or NestJS
```

#### Common Package

```bash
mkdir -p packages/common/src
cd packages/common
npm init -y
```

```json
// packages/common/package.json
{
  "name": "@myorg/common",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "dependencies": {
    "zod": "^3.22.2"
  }
}
```

---

### 4. 🧠 Define Zod Schema in Common

```ts
// packages/common/src/schema/user.ts
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;
```

---

### 5. 🛠 Configure TypeScript

#### Root `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@myorg/common": ["packages/common/src"]
    }
  }
}
```

#### Common `tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true
  },
  "include": ["src"]
}
```

#### Frontend & Backend `tsconfig.json`

Extend root config and use aliases.

---

### 6. 📌 Turborepo Configuration

```json
// turbo.json
{
  "$schema": "https://turborepo.org/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false
    }
  }
}
```

---

### 7. 👨‍💻 Use Common Package

#### In Frontend

```ts
// apps/frontend/app/page.tsx
import { UserSchema } from "@myorg/common/schema/user";

const valid = UserSchema.safeParse({ id: "123", name: "John", email: "test@mail.com" });
```

#### In Backend

```ts
// apps/backend/routes/user.ts
import { UserSchema } from "@myorg/common/schema/user";
const parsed = UserSchema.parse(req.body);
```

---

## 🚀 Development and Build

### Run dev for all apps

```bash
pnpm dev
# or
turbo run dev
```

### Build all

```bash
turbo run build
```

### Build only common package

```bash
turbo run build --filter=@myorg/common
```

---

## 🧠 Advantages of Using Turborepo

| Feature             | Benefit                                         |
| ------------------- | ----------------------------------------------- |
| 📦 Shared Code      | One source of truth for types, validation, etc. |
| 🚀 Build Caching    | No re-builds if nothing changed                 |
| 📂 Dependency Graph | Smart builds based on changes                   |
| 🔄 Version Control  | Fine-grained versioning with changesets         |
| 🛠 Task Pipelines   | `^build` means build dependencies first         |

---

## 🔐 Private Publishing (Optional)

If you want to share `common` outside the repo:

```bash
cd packages/common
npm publish --access restricted
```

Or use **GitHub Package Registry**, or just use internal linking via workspaces.

---

## 🔚 Summary

Turborrepo helps manage a monorepo by:

* Structuring shared logic (`common`)
* Avoiding code duplication
* Speeding up dev and builds
* Ensuring consistency across frontend/backend

Using a library like `zod` in `common` ensures your data validation and types remain in sync across the stack.

---

Let me know if you want a **working GitHub example repo** or want to extend this with **Changesets for versioning** or **GitHub Actions CI/CD**.
