# Prisma Relationships - Week 12.5

## Overview

This comprehensive guide covers Prisma's approach to defining and managing relationships within a database schema. It explains the significance of the Prisma Client in facilitating database operations and the role of Prisma's migration system in tracking and applying schema changes.

## Understanding Relationships in Prisma

In Prisma, relationships between tables are defined using a straightforward and expressive syntax within the Prisma schema file. These relationships are crucial for representing how data in one table is associated with data in another.

### Types of Relationships

Prisma supports the following relationship types:

1. **One to One**: A single record in one table is linked to a single record in another table
2. **One to Many**: A single record in one table is linked to multiple records in another table
3. **Many to One**: Multiple records in one table are linked to a single record in another table (inverse of one-to-many)
4. **Many to Many**: Multiple records in one table are linked to multiple records in another table

## Implementing One-to-Many Relationships

### TODO App Example

For our TODO app, we'll implement a one-to-many relationship between `User` and `Todo` models:
- One user can have many todos
- Each todo belongs to only one user

### Updated Prisma Schema

```prisma
// This is your Prisma schema file
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = "postgresql://postgres:mysecretpassword@localhost:5432/postgres"
}

model User {
  id         Int      @id @default(autoincrement())
  username   String   @unique
  password   String
  firstName  String
  lastName   String
  todos      Todo[]
}

model Todo {
  id          Int     @id @default(autoincrement())
  title       String
  description String
  done        Boolean @default(false)
  userId      Int
  user        User    @relation(fields: [userId], references: [id])
}
```

### Schema Breakdown

**User Model:**
- `todos` field: An array of `Todo` objects representing the "many" side of the relationship

**Todo Model:**
- `userId` field: Stores the reference to the associated User
- `user` field: Establishes the relationship using `@relation` attribute
  - `fields: [userId]`: Specifies which field stores the connection
  - `references: [id]`: Specifies which field on the User model is referenced

## Working with Prisma Client

### Why Prisma Client?

The Prisma Client is an auto-generated, type-safe database client that provides:
- Comfortable and secure database interactions
- Type safety at compile time
- Intuitive API for complex queries

### Basic Usage Example

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createTodoForUser(userId: number, title: string, description: string) {
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      user: {
        connect: { id: userId },
      },
    },
  });
  return todo;
}

async function getUserWithTodos(userId: number) {
  const userWithTodos = await prisma.user.findUnique({
    where: { id: userId },
    include: { todos: true },
  });
  return userWithTodos;
}
```

## Database Migration Process

### Applying Schema Changes

After updating your schema, run these commands to apply changes:

```bash
# Create and apply migration
npx prisma migrate dev --name relationship

# Regenerate Prisma Client
npx prisma generate
```

### What Happens During Migration

1. `prisma migrate dev` creates a new migration file in `prisma/migrations`
2. The migration file contains SQL statements to update the database schema
3. `prisma generate` updates the Prisma Client to include new relationship logic
4. The migrations folder tracks all schema changes over time

## CRUD Operations with Relationships

### 1. Creating Todos

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createTodo(userId: number, title: string, description: string) {
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      userId
    },
  });
  console.log(todo);
}

// Usage
createTodo(1, "go to gym", "go to gym and do 10 pushups");
```

### 2. Retrieving User's Todos

```typescript
async function getTodos(userId: number) {
  const todos = await prisma.todo.findMany({
    where: {
      userId: userId,
    },
  });
  console.log(todos);
}

// Usage
getTodos(1);
```

### 3. Getting Todos with User Details

#### ❌ Inefficient Approach (Multiple Queries)

```typescript
async function getTodosAndUserDetails(userId: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  const todos = await prisma.todo.findMany({
    where: {
      userId: userId,
    }
  });
  console.log(user);
  console.log(todos);
}
```

#### ✅ Efficient Approach (Single Query with Select)

```typescript
async function getTodosAndUserDetails(userId: number) {
  const todos = await prisma.todo.findMany({
    where: {
      userId: userId,
    },
    select: {
      title: true,
      description: true,
      done: true,
      user: {
        select: {
          username: true,
          firstName: true,
          lastName: true
        }
      }
    }
  });
  console.log(todos);
}

// Usage
getTodosAndUserDetails(1);
```

## Key Benefits

- **Type Safety**: Compile-time checking prevents runtime errors
- **Intuitive API**: Natural syntax for complex database operations
- **Migration Management**: Automatic tracking of schema changes
- **Relationship Handling**: Simplified joins and data fetching
- **Performance**: Optimized queries and efficient data loading

## Best Practices

1. **Use Select Wisely**: Only fetch the fields you need to improve performance
2. **Leverage Include**: Use `include` for related data when you need complete objects
3. **Batch Operations**: Use transactions for multiple related operations
4. **Migration Naming**: Use descriptive names for your migrations
5. **Schema Organization**: Keep your schema file clean and well-commented