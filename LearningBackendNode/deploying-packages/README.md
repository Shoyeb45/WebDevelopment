# 📦 Deploying Custom Packages to NPM & Understanding the `common` Folder in Full Stack Projects

---

## ✅ Why Custom Packages?

In full-stack applications (especially monorepos), certain logic needs to be shared between the **frontend** and the **backend**:

* Input validation schemas (`zod`)
* Types and interfaces
* Utility functions
* Constants

Instead of duplicating code or creating symlinks, **publishing a shared npm package** allows:

* Clean separation of concerns
* Reusability
* Version control

---

## 📁 What is the `common` Folder?

In monorepos or full-stack projects, a `common` folder/package typically contains:

| Type                   | Purpose                                                       |
| ---------------------- | ------------------------------------------------------------- |
| **Validation schemas** | Using libraries like `zod` to define and reuse schemas        |
| **TypeScript types**   | Share `User`, `Product`, `Order` types across client & server |
| **Constants/configs**  | Enums, roles, API routes, etc.                                |
| **Utility functions**  | Date formatting, validation logic, etc.                       |

> This `common` folder is often made into an npm package and published privately or publicly.

---

## 🧪 Example: Using `zod` in a Common Package

### 1. Create Monorepo/Project Structure

```bash
my-fullstack-app/
├── backend/
│   └── ...
├── frontend/
│   └── ...
└── common/
    ├── package.json
    └── src/
        └── schema/
            └── user.ts
```

### 2. Define Schema with Zod in `common`

```ts
// common/src/schema/user.ts
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["admin", "user"]),
});

// Typescript inference
export type User = z.infer<typeof UserSchema>;
```

---

## 🚀 Publishing Custom Package to NPM

### Step 1: Create `package.json` in `common`

```json
{
  "name": "@your-org/common",
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

> Use a scoped name like `@your-org/common` for organizational packages.

### Step 2: Setup `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "declaration": true,
    "outDir": "dist",
    "rootDir": "src",
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

### Step 3: Add `.npmignore` or set `files` in `package.json`

```json
"files": ["dist"]
```

### Step 4: Build the package

```bash
cd common
npm run build
```

### Step 5: Login to npm

```bash
npm login
```

### Step 6: Publish the package

```bash
npm publish --access public
```

For private org-scoped packages, use:

```bash
npm publish --access restricted
```

---

## 🔁 Using the Common Package

### In Backend:

```bash
cd backend
npm install @your-org/common
```

```ts
// backend/routes/user.ts
import { UserSchema } from "@your-org/common";
const validated = UserSchema.parse(req.body);
```

### In Frontend:

```bash
cd frontend
npm install @your-org/common
```

```ts
// frontend/forms/RegisterForm.ts
import { UserSchema } from "@your-org/common";
const result = UserSchema.safeParse(formData);
```

---

## 🧠 Why Use Zod + Common Folder?

| Benefit                | Description                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| 🔄 DRY Principle       | Avoid repeating validation logic in both backend and frontend         |
| 🧪 Type Inference      | Use `z.infer<typeof Schema>` to keep types in sync                    |
| 🚫 No Code Duplication | `common` folder acts as a single source of truth                      |
| 🔐 Better Validation   | Catch errors early on both ends                                       |
| 📦 Modular Design      | Encourages package-based architecture and clean dependency management |

---

## 🛠 Tips

* Use `pnpm` or `yarn workspaces` to link local packages in monorepos before publishing.
* Use `semantic-release` or `changesets` to manage versioning.
* Add `peerDependencies` in `common/package.json` to avoid multiple versions of shared libs like `zod`.

---