# GraphQL — Complete Notes

---

## 1. What is GraphQL?

GraphQL is a **query language for APIs** and a runtime for executing those queries, developed by Facebook in 2012 and open-sourced in 2015.

Unlike REST, where the server decides what data is returned, GraphQL lets the **client ask for exactly what it needs** — no more, no less.

Key characteristics:
- Single endpoint (e.g., `/graphql`) instead of multiple REST endpoints
- Strongly typed schema — the API is described using a type system
- Hierarchical — queries mirror the shape of the data they return
- Client-driven — the client controls the response structure

---

## 2. Why Do We Need GraphQL?

REST APIs work, but they come with pain points in modern app development:

- Multiple round trips: fetching a user's profile + their posts + their followers requires 3 separate API calls in REST
- No standard for partial data: REST gives you the full resource or nothing
- Documentation drift: REST endpoints can become inconsistent over time
- Versioning problems: `/api/v1`, `/api/v2`... GraphQL schemas evolve without versioning

GraphQL solves these by giving a **single, self-documenting, flexible endpoint**.

---

## 3. Over-fetching and Under-fetching

These are the two core problems GraphQL was built to solve.

### Over-fetching
Getting **more data than you need**.

> Example: A REST endpoint `GET /users/1` returns name, email, address, bio, avatar, preferences — but your UI only needs the name and email. You've over-fetched.

### Under-fetching
Getting **less data than you need**, forcing extra requests.

> Example: `GET /users/1` returns the user but not their posts. You then call `GET /users/1/posts`. That's under-fetching — one request wasn't enough.

### GraphQL's Solution
With GraphQL, you ask for exactly what you need in one query:

```graphql
query {
  user(id: "1") {
    name
    email
    posts {
      title
    }
  }
}
```

One request. Exactly the fields you asked for.

---

## 4. Introduction to GraphQL Query Language

GraphQL has three core operation types:

### Query — Read data
```graphql
query {
  books {
    title
    author
  }
}
```

### Mutation — Write/update data
```graphql
mutation {
  addBook(title: "Deep Work", author: "Cal Newport") {
    id
    title
  }
}
```

### Subscription — Real-time data (via WebSockets)
```graphql
subscription {
  bookAdded {
    title
  }
}
```

### Arguments & Variables
```graphql
query GetBook($id: ID!) {
  book(id: $id) {
    title
    author
  }
}
```

### Aliases & Fragments
```graphql
query {
  first: book(id: "1") { title }
  second: book(id: "2") { title }
}
```

---

## 5. Starting a GraphQL Server with Apollo in Node.js

Apollo Server is the most popular GraphQL server for Node.js.

### Install dependencies
```bash
npm init -y
npm install @apollo/server graphql
```

---

## 6. Writing a Standalone Apollo GraphQL Server

```typescript
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
```

Run with:
```bash
npx ts-node index.ts
```

Visit `http://localhost:4000` to open Apollo Sandbox.

---

## 7. Adding TypeDefs in a Schema File

TypeDefs define the **shape of your API** — what types exist, what queries are available, and what fields each type has.

```typescript
const typeDefs = `
  type Book {
    id: ID!
    title: String!
    author: String!
    year: Int
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }
`;
```

**Common scalar types:** `String`, `Int`, `Float`, `Boolean`, `ID`

The `!` means the field is **non-nullable** (required).

---

## 8. Adding Resolvers in a Resolvers File

Resolvers are **functions that return data** for each field in your schema.

```typescript
// resolvers.ts
const books = [
  { id: '1', title: 'Clean Code', author: 'Robert Martin', year: 2008 },
  { id: '2', title: 'Deep Work', author: 'Cal Newport', year: 2016 },
];

export const resolvers = {
  Query: {
    books: () => books,
    book: (_: unknown, args: { id: string }) =>
      books.find((b) => b.id === args.id),
  },
};
```

Each resolver receives `(parent, args, context, info)`:
- `parent` — result of the parent resolver
- `args` — arguments passed to the field
- `context` — shared state (auth, DB connection, etc.)
- `info` — AST info about the query

---

## 9. Moving TypeDefs to a `schema.graphql` File

Instead of writing typeDefs as a string in code, you can keep them in a separate `.graphql` file for better editor support and separation of concerns.

```graphql
# schema.graphql
type Book {
  id: ID!
  title: String!
  author: String!
  year: Int
}

type Query {
  books: [Book]
  book(id: ID!): Book
}
```

Load it in your server file:
```typescript
import { readFileSync } from 'fs';

const typeDefs = readFileSync('./schema.graphql', 'utf-8');
```

---

## 10. Generating TypeScript Types from TypeDefs

Use **GraphQL Code Generator** to auto-generate TypeScript types from your schema, keeping your types and schema always in sync.

### Install
```bash
npm install -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers
```

### Config file — `codegen.ts`
```typescript
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  generates: {
    './src/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
```

### Run the generator
```bash
npx graphql-codegen
```

This produces a `types.ts` file with interfaces like `Book`, `QueryResolvers`, etc.

---

## 11. Adding Types in the Resolvers

After generating types, import and apply them to your resolvers for full type safety.

```typescript
// resolvers.ts
import { Resolvers } from './types';

export const resolvers: Resolvers = {
  Query: {
    books: () => books,
    book: (_, args) => books.find((b) => b.id === args.id) ?? null,
  },
};
```

Now your editor will auto-complete resolver signatures and warn you about missing fields or type mismatches.

---

## 12. Adding Nested Queries

Nested queries allow you to resolve **related data** — e.g., fetching an author's details from a book.

### Update schema
```graphql
type Author {
  id: ID!
  name: String!
}

type Book {
  id: ID!
  title: String!
  author: Author!
}

type Query {
  books: [Book]
}
```

### Add a nested resolver
```typescript
export const resolvers: Resolvers = {
  Query: {
    books: () => books,
  },
  Book: {
    author: (parent) => authors.find((a) => a.id === parent.authorId) ?? null,
  },
};
```

The `Book.author` resolver uses `parent` — the resolved `Book` object — to look up the matching author.

---

## 13. Solving the Mapper Issue

When your **database model** and your **GraphQL type** have different shapes, GraphQL Code Generator can get confused (e.g., your DB has `author_id` but your GQL type has `author: Author`).

### Solution: Define mappers in `codegen.ts`
```typescript
const config: CodegenConfig = {
  schema: './schema.graphql',
  generates: {
    './src/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        mappers: {
          Book: './models#BookModel',
          Author: './models#AuthorModel',
        },
      },
    },
  },
};
```

### Define your DB models
```typescript
// models.ts
export interface BookModel {
  id: string;
  title: string;
  author_id: string; // DB field name
}

export interface AuthorModel {
  id: string;
  name: string;
}
```

Now the codegen knows that when resolving a `Book` type, the `parent` is of type `BookModel` — giving you correct types in nested resolvers.

---

## 14. Adding Mutations

Mutations allow clients to **create, update, or delete** data.

### Add to schema
```graphql
type Mutation {
  addBook(title: String!, authorId: ID!): Book!
  deleteBook(id: ID!): Boolean!
}
```

### Add resolvers
```typescript
export const resolvers: Resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook: (_, args) => {
      const newBook: BookModel = {
        id: String(books.length + 1),
        title: args.title,
        author_id: args.authorId,
      };
      books.push(newBook);
      return newBook;
    },
    deleteBook: (_, args) => {
      const index = books.findIndex((b) => b.id === args.id);
      if (index === -1) return false;
      books.splice(index, 1);
      return true;
    },
  },
};
```

### Call from client
```graphql
mutation {
  addBook(title: "Atomic Habits", authorId: "3") {
    id
    title
  }
}
```

---

## Quick Reference Cheatsheet

| Concept | Description |
|---|---|
| `typeDefs` | Schema definition — the shape of your API |
| `resolvers` | Functions that return actual data |
| `Query` | Read-only operations |
| `Mutation` | Write operations (create/update/delete) |
| `Subscription` | Real-time data via WebSockets |
| `parent` | Result from the parent resolver (used in nested queries) |
| `args` | Arguments passed to a field |
| `context` | Shared data (auth, DB) available to all resolvers |
| `!` | Non-nullable field |
| `[Type]` | Array of a type |
| Mapper | Bridges DB model shape → GQL type shape |