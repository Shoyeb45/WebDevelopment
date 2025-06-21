# Week 16.1 - Turborepo and Monorepos

![Week 16.1 Cover](https://www.notion.so/image/https%3A%2F%2Fwww.notion.so%2Fimages%2Fpage-cover%2Fmet_william_morris_1878.jpg?table=block&id=9c437c0b-8557-4dd1-a1e2-0168ed35d455&cache=v2)

In this lecture, Harkirat introduces **monorepos** and the **Turborepo framework**, exploring its features like **caching**, **parallelization**, and **dependency management**. He guides through initializing a Turborepo project, running applications, adding different types of apps (Next.js, React, Node.js), and creating **shared common modules** across the monorepo.

## Table of Contents

- [What are Monorepos](#what-are-monorepos)
- [Examples of Monorepos](#examples-of-monorepos) 
- [Importance for Full Stack Engineers](#importance-for-full-stack-engineers)
- [Why Monorepos](#why-monorepos)
- [Monorepo Frameworks](#monorepo-frameworks)
- [Turborepo Features](#turborepo-features)
- [Setting Up Turborepo](#initializing-a-simple-turborepo)
- [Running the Project](#running-the-project)
- [Exploring the Structure](#exploring-root-packagejson)

---

## What are Monorepos

A **monorepo**, short for "monolithic repository," is a single repository that contains all the code for multiple projects or components of a larger application. Instead of having separate repositories for frontend, backend, and DevOps code, a monorepo consolidates everything into a single repository.

In a monorepo structure, you'll typically find directories for different parts of the application, such as:

```
monorepo/
  ├── frontend/
  │   ├── web-app/
  │   └── mobile-app/
  ├── backend/
  │   ├── api-server/
  │   └── database/
  ├── devops/
  │   ├── ci-cd/
  │   └── infrastructure/
  └── shared/
      ├── utils/
      └── components/
```

This structure allows for a centralized location where all the code related to a project or organization can be stored, versioned, and managed together.

### Examples of Monorepos

Several popular open-source projects and companies adopt the monorepo approach:

1. **Daily Code** ([https://github.com/code100x/daily-code](https://github.com/code100x/daily-code)): This repository contains code for a daily coding challenge website. It includes both the frontend and backend code in a single repository.

2. **Cal.com** ([https://github.com/calcom/cal.com](https://github.com/calcom/cal.com)): Cal.com is an open-source scheduling platform. Their monorepo contains the code for the web application, backend services, and various integrations.

### Importance for Full Stack Engineers

As a full stack engineer, it's not essential to have in-depth knowledge of setting up and managing monorepos from scratch. In most cases, the monorepo structure is already established by the development tools team or the project's initial setup.

However, it's beneficial to understand the best practices and conventions used within a monorepo:

- Understanding the directory structure and where to locate specific components or modules
- Following the established coding standards and guidelines for the project
- Utilizing the shared libraries and utilities effectively to maintain consistency across the codebase
- Collaborating with other team members and working within the monorepo workflow

### Setting Up a Monorepo

If you do need to set up a monorepo from scratch, there are several tools and frameworks available:

- **Lerna** ([https://lerna.js.org/](https://lerna.js.org/)): A tool for managing JavaScript projects with multiple packages
- **Nx** ([https://nx.dev/](https://nx.dev/)): A powerful suite of tools for monorepo development, particularly suited for Angular and React projects
- **Bazel** ([https://bazel.build/](https://bazel.build/)): A build and test tool that supports monorepo structures and enables fast and scalable builds

> Monorepos provide a centralized approach to managing code for multiple projects or components within a single repository. They offer benefits such as code sharing, simplified dependency management, and easier collaboration among team members.

---

## Why Monorepos

### When to Use Monorepos

#### 1. Shared Code Reuse

One of the primary benefits of using a monorepo is the ability to easily share code between different services or projects. In a monorepo, you can have a dedicated directory for shared libraries, utilities, or components that can be used across multiple services.

For example, consider a monorepo structure like this:

```
monorepo/
  ├── shared/
  │   ├── utils/
  │   └── components/
  ├── frontend/
  │   └── web-app/
  └── backend/
      └── api-server/
```

In this structure, the `shared` directory contains code that can be reused by both the `frontend` and `backend` services. This promotes code reuse, reduces duplication, and makes it easier to maintain and update shared code.

#### 2. Enhanced Collaboration

Monorepos foster collaboration among team members by providing a centralized location for all the code. Developers can easily navigate and contribute to different parts of the project without the need to switch between multiple repositories.

With a monorepo, developers have visibility into the entire codebase, making it easier to understand the dependencies and relationships between different services. This promotes cross-team collaboration and knowledge sharing.

![Enhanced Collaboration](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F3ed3d027-499c-425f-9138-592a07ce318a%2FUntitled.png?table=block&id=8c3aea7c-cf1b-46e9-9a2e-5950dfd43cbe&cache=v2)

#### 3. Optimized Builds and CI/CD

Monorepos enable the use of specialized tools like TurboRepo, which offer smart caching and task execution strategies. These tools can significantly reduce build and testing times by leveraging the shared nature of the codebase.

For example, TurboRepo can intelligently cache build artifacts and only rebuild the parts of the project that have changed. This means that if you modify a specific service, only that service and its dependencies will be rebuilt, rather than rebuilding the entire project from scratch.

Here's an example of how you can configure TurboRepo in your monorepo:

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    }
  }
}
```

In this configuration, the `build` task depends on the `build` tasks of its dependencies, and the `test` task depends on the `build` task. TurboRepo will optimize the execution of these tasks based on the defined dependencies and cache the outputs for faster subsequent builds.

#### 4. Centralized Tooling and Configuration

Managing build tools, linters, formatters, and other configurations becomes simpler in a monorepo. Instead of duplicating configurations across multiple repositories, you can have a single set of tools and configurations that apply to the entire project.

For example, you can have a single `package.json` file at the root of your monorepo that defines the common dependencies and scripts for all the services:

```json
// package.json
{
  "name": "monorepo",
  "scripts": {
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "prettier": "^2.0.0",
    "turbo": "^1.0.0"
  }
}
```

With this centralized configuration, you can run commands like `npm run build`, `npm run test`, `npm run lint`, or `npm run format` at the root level, and they will be applied consistently across all the services in your monorepo.

### When to Use Simple Folders

While monorepos offer several benefits, there are scenarios where using simple folders might be sufficient:

#### 1. Highly Decoupled Services

If your services are highly decoupled and don't share any code, using separate folders or even separate repositories might be a simpler approach. This is especially true if the services are written in different languages or have vastly different requirements.

#### 2. Independent Services

If your services don't depend on each other and can be developed, tested, and deployed independently, using separate folders or repositories can provide more flexibility and autonomy to individual teams.

![Simple Folders vs Monorepos](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F697ae7ef-84e9-46f1-9ba6-2946719d1f7d%2FUntitled.png?table=block&id=419d0ff2-51e8-4458-9285-ef0de42553ac&cache=v2)

For example, if you have a codebase with a Golang service and a JavaScript service that don't share any code or dependencies, you can structure them in separate folders:

```
project/
  ├── golang-service/
  └── js-service/
```

In this case, each service can have its own build process, dependencies, and deployment pipeline, without the need for a monorepo setup.

### Conclusion

Monorepos offer several advantages, such as shared code reuse, enhanced collaboration, optimized builds and CI/CD, and centralized tooling and configuration. They are particularly beneficial when you have multiple services or projects that share code and dependencies.

However, if your services are highly decoupled or don't depend on each other, using simple folders or separate repositories might be a more straightforward approach.

Ultimately, the choice between a monorepo and separate folders/repositories depends on the specific needs and characteristics of your project. Consider factors such as code sharing, collaboration requirements, build and deployment processes, and team structure when making the decision.

---

## Monorepo Frameworks

### Common Monorepo Frameworks in Node.js

#### 1. Lerna

**Lerna** ([https://lerna.js.org/](https://lerna.js.org/)): Lerna is a popular tool for managing JavaScript monorepos. It provides features like package management, versioning, and publishing. With Lerna, you can easily manage dependencies, run scripts across multiple packages, and publish packages to npm.

Example `lerna.json` configuration:

```json
{
  "packages": ["packages/*"],
  "version": "independent",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

#### 2. Nx

**Nx** ([https://github.com/nrwl/nx](https://github.com/nrwl/nx)): Nx is a powerful monorepo tool and build system developed by Nrwl. It offers a wide range of features, including code generation, dependency management, and advanced build optimization. Nx supports various frontend and backend frameworks, making it a versatile choice for monorepo development.

Example `nx.json` configuration:

```json
{
  "npmScope": "myorg",
  "affected": {
    "defaultBase": "main"
  },
  "tasksRunnerOptions": {
    "default": {
      "runner": "@nrwl/workspace/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "lint", "test", "e2e"]
      }
    }
  }
}
```

#### 3. Turborepo

**Turborepo** ([https://turbo.build/](https://turbo.build/)): Turborepo is a high-performance build system for JavaScript and TypeScript codebases. While not strictly a monorepo framework, it provides powerful features for managing and optimizing monorepo builds. Turborepo focuses on fast incremental builds, caching, and efficient task execution.

Example `turbo.json` configuration:

```json
{
  "$schema": "https://turborepo.org/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    }
  }
}
```

#### 4. Yarn/npm Workspaces

**Yarn/npm Workspaces** ([https://classic.yarnpkg.com/lang/en/docs/workspaces/](https://classic.yarnpkg.com/lang/en/docs/workspaces/)): Yarn and npm both provide built-in support for workspaces, which allow you to manage multiple packages within a single repository. Workspaces enable you to share dependencies across packages and link them together for development purposes.

Example `package.json` configuration with Yarn workspaces:

```json
{
  "private": true,
  "workspaces": ["packages/*"]
}
```

### Monorepos vs. Turborepo

Monorepos and Turborepo are related but distinct concepts. Let's clarify the differences:

#### Monorepos

- A monorepo is an architectural approach where multiple projects or packages are stored and managed within a single repository
- Monorepos provide benefits such as code sharing, simplified dependency management, and unified versioning across projects
- Monorepo tools like Lerna, Nx, and Yarn/npm workspaces help manage and orchestrate the monorepo structure, including package management, script execution, and publishing
- Monorepos can be used with various build systems and tools, not limited to Turborepo

![Monorepos Diagram](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F0428ce14-98d2-4ee7-9331-50702a208611%2FUntitled.png?table=block&id=ce03874d-ca17-4b53-8100-19aa4c6c7cbf&cache=v2)

#### Turborepo

- Turborepo is a specific build system and task runner designed for high-performance builds in monorepo setups
- It focuses on optimizing build times, caching, and efficient execution of tasks across multiple packages
- Turborepo leverages a smart scheduling algorithm to determine the optimal order of task execution based on package dependencies
- It provides features like remote caching, incremental builds, and parallel execution to speed up the development workflow
- While Turborepo is commonly used in monorepo setups, it can also be used in multi-repo setups where fast and efficient builds are desired

> In summary, monorepos are an architectural pattern for managing multiple projects within a single repository, while Turborepo is a specific build system that can be used within a monorepo (or multi-repo) setup to optimize and accelerate the build process. Turborepo complements monorepo tools by providing advanced build optimization features, making it a popular choice for monorepo development in the Node.js ecosystem.

---

## Short Interesting History of Turborepo

Turborepo was created by **Jared Palmer** to address the challenges of building and managing monorepos in the JavaScript ecosystem. The tool was initially written in **Go**, inspired by the success of the JavaScript bundler esbuild, which is also written in Go.

**The main objectives behind Turborepo were:**

1. Utilize advanced build techniques used by big tech companies in their monorepo tools
2. Provide an easy-to-adopt tool that doesn't require significant changes to the existing codebase
3. Meet developers where they are, integrating with their current tools and workflows

![Turborepo History](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F5f0b8cf4-fddf-42b4-ae95-357886e5b66b%2FUntitled.png?table=block&id=f249d87a-f35b-496f-8e46-d9b26f1a3cca&cache=v2)

Turborepo achieves faster build times through smart caching and parallelization. It uses content-addressable storage to cache build artifacts and constructs a dependency graph to determine which tasks can be run in parallel.

In **December 2021**, **Vercel acquired Turborepo** through an acqui-hire of Jared Palmer and his team. This acquisition brought additional resources and support to grow and evolve Turborepo.

Although Turborepo has gained popularity and praise for its capabilities, it is still a relatively new tool (the latest version as of the search results is 1.1.16). Some users have reported inconsistencies and the need for further polishing for production usage.

Despite these early challenges, Turborepo has shown significant potential in improving build times and simplifying monorepo management. The company highlights a case study where Turborepo saved **67 hours of continuous integration time** for a team of only four developers.

> Overall, Turborepo has emerged as a promising solution for JavaScript monorepos, leveraging advanced build techniques and offering an easy-to-adopt approach for developers.

---

## Important Concepts

### 1. Build System

A **build system** is a tool that automates the process of transforming source code written by developers into executable code that can be run on a computer. In the context of JavaScript and TypeScript projects, a build system performs tasks such as:

- **Transpilation**: Converting TypeScript code to JavaScript code
- **Bundling**: Combining multiple JavaScript files into a single file or a smaller set of files to optimize loading and execution
- **Minification**: Reducing the size of JavaScript files by removing unnecessary characters and optimizing the code
- **Testing**: Running automated tests to ensure the correctness and reliability of the code
- **Linting**: Analyzing the code for potential errors, style inconsistencies, and adherence to coding standards
- **Deployment**: Preparing the built code for deployment to a production environment

Examples of popular build systems in the JavaScript ecosystem include **Webpack**, **Rollup**, **Parcel**, and **Vite**.

### 2. Build System Orchestrator

A **build system orchestrator**, like Turborepo, sits on top of the actual build systems and coordinates the execution of tasks across multiple packages or projects within a monorepo. Instead of directly performing tasks like transpilation or bundling, a build system orchestrator focuses on:

- **Task Definition**: Allowing developers to define tasks in a configuration file (e.g., `turbo.json`) that specify the commands to run for each task
- **Task Orchestration**: Determining the order in which tasks should be executed based on their dependencies and optimizing the execution process
- **Caching**: Intelligently caching the results of previous builds to speed up subsequent builds and avoid redundant work
- **Parallel Execution**: Leveraging available system resources to run tasks in parallel, improving overall build performance

Here's an example of how you might define tasks in a `turbo.json` file:

```json
{
  "$schema": "https://turborepo.org/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    }
  }
}
```

In this example, the `build` task depends on the `build` tasks of its dependencies (indicated by `^build`), the `test` task depends on the `build` task, and the `lint` task has no dependencies. Turborepo will optimize the execution of these tasks based on their dependencies and cache the outputs for faster subsequent builds.

### 3. Monorepo Framework

A **monorepo framework** provides a set of tools and conventions for managing projects that contain multiple packages or applications within a single repository. It focuses on:

- **Dependency Management**: Handling dependencies between packages within the monorepo, ensuring that packages can reference and use each other correctly
- **Workspace Configuration**: Providing a way to define and configure workspaces, which are separate packages or projects within the monorepo
- **Shared Code**: Facilitating the sharing of common code, utilities, and configurations across packages within the monorepo
- **Versioning**: Managing the versioning of packages within the monorepo, often using a unified versioning scheme

Examples of monorepo frameworks include **Lerna**, **Nx**, and **Rush**.

Here's an example of a monorepo structure using Lerna:

```
monorepo/
  ├── packages/
  │   ├── package-a/
  │   │   ├── src/
  │   │   ├── package.json
  │   │   └── tsconfig.json
  │   └── package-b/
  │       ├── src/
  │       ├── package.json
  │       └── tsconfig.json
  ├── package.json
  └── lerna.json
```

In this structure, the `packages` directory contains individual packages (`package-a` and `package-b`), each with its own `package.json` and source code. The root `package.json` and `lerna.json` files configure the monorepo and define the workspaces.

### Relationship between all 3

These three concepts are related but serve different purposes:

- A **build system** focuses on the actual transformation and processing of source code into executable code
- A **build system orchestrator** sits on top of build systems and coordinates the execution of tasks across multiple packages or projects within a monorepo
- A **monorepo framework** provides the structure, conventions, and tools for managing multiple packages or projects within a single repository

> In a typical monorepo setup, you might use a monorepo framework like Lerna to manage the overall structure and dependencies, a build system orchestrator like Turborepo to optimize and coordinate the execution of tasks, and individual build systems like Webpack or Vite to perform the actual code transformation and bundling.

---

## Turborepo Features

Turborepo is a build system orchestrator designed to manage and optimize the execution of tasks across a monorepo. It sits on top of existing build systems and provides a layer of coordination and optimization.

Instead of directly performing build tasks like transpilation, bundling, or testing, Turborepo focuses on managing the execution of these tasks across the packages in your monorepo. It leverages intelligent caching, parallelization, and dependency graph awareness to speed up the overall build process.

Here are the key features of Turborepo that make it an effective build system orchestrator:

### 1. Caching

Turborepo implements a caching mechanism to avoid unnecessary work and speed up subsequent builds. It caches the outputs of tasks based on their inputs (source files, dependencies, and configuration). If a task is executed again without any changes to its inputs, Turborepo can retrieve the cached output instead of re-executing the task.

For example, consider a `build` task defined in your `turbo.json` file:

```json
{
  "$schema": "https://turborepo.org/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

In this configuration, the `build` task depends on the `build` tasks of its dependencies (indicated by `^build`). Turborepo will cache the output of the `build` task in the `dist` directory. If the task is run again without any changes to its inputs, Turborepo will retrieve the cached output from the `dist` directory instead of re-executing the task.

### 2. Parallelization

Turborepo can identify independent tasks and run them in parallel, making efficient use of available system resources. By leveraging parallelization, Turborepo can significantly reduce the overall build time.

For example, consider the following `turbo.json` configuration:

```json
{
  "$schema": "https://turborepo.org/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    }
  }
}
```

In this example, the `test` task depends on the `build` task, but the `lint` task has no dependencies. Turborepo will recognize that the `lint` task can be run in parallel with the `build` task, optimizing the execution process.

### 3. Dependency Graph Awareness

Turborepo understands the dependency graph of your monorepo. It knows which packages depend on each other and ensures that tasks are run in the correct order based on those dependencies.

For example, consider a monorepo with two packages: `package-a` and `package-b`. If `package-b` depends on `package-a`, Turborepo will ensure that the tasks for `package-a` are executed before the tasks for `package-b`.

This dependency graph awareness allows Turborepo to build packages efficiently and avoid unnecessary rebuilds of downstream packages.

By leveraging caching, parallelization, and dependency graph awareness, Turborepo can significantly speed up the build process in a monorepo. It minimizes redundant work, optimizes resource utilization, and ensures that tasks are executed in the correct order based on package dependencies.

💡 **Note**: Turborepo integrates seamlessly with existing build systems and tools, allowing you to define tasks using familiar commands and scripts. It acts as an orchestration layer, coordinating the execution of these tasks across the packages in your monorepo. To get started with Turborepo, you typically create a `turbo.json` file at the root of your monorepo, defining the tasks and their dependencies. Turborepo then uses this configuration to optimize the execution of tasks based on the defined pipeline.

> By adopting Turborepo as a build system orchestrator, you can significantly improve the efficiency and speed of your monorepo builds, especially in large-scale projects with multiple packages and complex dependencies.

---

## Initializing a Simple Turborepo

Let's dive into initializing a simple Turborepo and explore the generated folder structure.

### Initializing a Turborepo

To initialize a new Turborepo, you can use the `create-turbo` CLI. Run the following command in your terminal:

```bash
npx create-turbo@latest
```

This command will install the `create-turbo` package and run it to create a new Turborepo.

During the initialization process, you'll be prompted to select a monorepo framework. In this case, choose **"npm workspaces"** as the monorepo framework.

### Cloning the Starter Repository

If the initialization process is taking a long time, you have the option to clone a starter repository instead. The starter repository provides a pre-configured Turborepo setup that you can use as a starting point.

To clone the starter repository, run the following command:

```bash
git clone https://github.com/100xdevs-cohort-2/week-16-1.git
```

After cloning the repository, navigate to the root folder of the cloned project and run `npm install` to install the necessary dependencies.

![Turborepo Initialization](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2Fdf0e2b73-fd46-4b1c-9b65-cf8f2cd0f747%2FUntitled.png?table=block&id=49ed09c7-54b1-4193-8148-c6d58fd29e68&cache=v2)

## Turborepo Folder Structure

Once the initialization process is complete or you have cloned the starter repository, you will notice a folder structure similar to the following:

```
my-turborepo/
  ├── apps/
  │   ├── docs/
  │   └── web/
  ├── packages/
  │   ├── ui/
  │   ├── eslint-config/
  │   └── typescript-config/
  ├── package.json
  ├── turbo.json
  └── pnpm-workspace.yaml
```

Let's explore the different modules and their purposes in this folder structure:

### End User Apps

1. **`apps/web`**: This directory contains a Next.js website, which serves as the main user-facing application of your project.

2. **`apps/docs`**: This directory contains a documentation website built with Next.js. It is intended to host all the documentation related to your project.

### Helper Packages

1. **`packages/ui`**: This directory contains UI packages that can be shared across different applications in your project. It may include reusable components, styles, or UI-related utilities.

2. **`packages/typescript-config`**: This directory contains a shareable TypeScript configuration. It allows you to maintain a consistent TypeScript configuration across all the packages and applications in your monorepo.

3. **`packages/eslint-config`**: This directory contains a shareable ESLint configuration. It helps enforce consistent coding standards and best practices across your project.

![Turborepo Structure](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F0916a0b5-c6ac-4b03-9ff3-555dd2250f0d%2FUntitled.png?table=block&id=8146a083-2aaf-4003-82e0-4bda3d8e80e7&cache=v2)

The `package.json` file in the root directory serves as the main configuration file for your monorepo. It includes dependencies, scripts, and other metadata relevant to the entire project.

The `turbo.json` file is the configuration file for Turborepo. It specifies the build pipeline, task dependencies, and other Turborepo-specific settings.

The `pnpm-workspace.yaml` file is a configuration file for pnpm workspaces. It defines the workspace structure and shared dependencies within your monorepo.

By having this modular structure, you can easily manage and develop different parts of your project independently while still maintaining a cohesive and organized codebase.

To start developing with your Turborepo, you can navigate to the root directory and run the following command:

```bash
pnpm dev
```

This command will start the development server for all the applications and packages in your monorepo, allowing you to work on them simultaneously.

Remember to refer to the Turborepo documentation ([https://turbo.build/repo/docs](https://turbo.build/repo/docs)) for more detailed information on configuring and working with Turborepo.

---

## Running the Project

To run the project, navigate to the root folder of your Turborepo and execute the following command:

```bash
npm run dev
```

This command will start the development server for all the applications and packages in your monorepo.

### Node.js Version

If you encounter any issues related to your Node.js version, make sure you have a compatible version installed. Turborepo requires a relatively recent version of Node.js. You can check the required version in the project's documentation or the `package.json` file.

To upgrade your Node.js version, you can use a version manager like **nvm (Node Version Manager)** or download and install the latest version from the official Node.js website ([https://nodejs.org](https://nodejs.org/)).

### Running Applications

After running `npm run dev`, you will notice that two websites are running on different ports:

1. **`localhost:3000`**: This is the main user-facing application (`apps/web`) built with Next.js.

2. **`localhost:3001`**: This is the documentation website (`apps/docs`) also built with Next.js.

You can access these applications by opening your web browser and navigating to the respective URLs.

### Shared Code

One of the key benefits of using a monorepo with Turborepo is the ability to share code across different projects. In this case, the `packages/ui` directory contains reusable UI components that can be shared between the `apps/web` and `apps/docs` applications.

For example, let's say you have a custom button component defined in `packages/ui/Button.tsx`:

```tsx
// packages/ui/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClick}>
      {children}
    </button>
  );
};
```

You can then import and use this button component in both the `apps/web` and `apps/docs` applications:

```tsx
// apps/web/pages/index.tsx
import { Button } from 'ui';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Main App</h1>
      <Button onClick={() => console.log('Button clicked')}>Click Me</Button>
    </div>
  );
}
```

```tsx
// apps/docs/pages/index.tsx
import { Button } from 'ui';

export default function Docs() {
  return (
    <div>
      <h1>Documentation</h1>
      <Button onClick={() => console.log('Button clicked')}>Click Me</Button>
    </div>
  );
}
```

By sharing code through the `packages/ui` directory, you can maintain a consistent UI across your applications and avoid duplication of code.

 

#### **Turborepo Cache**

When you run `npm run dev`, Turborepo will automatically cache the build artifacts and dependencies of your packages and applications. This caching mechanism helps speed up subsequent builds and improves the overall development experience.

Turborepo intelligently determines which packages and applications need to be rebuilt based on the changes made to the codebase. It leverages the dependency graph to minimize unnecessary rebuilds and optimize the build process.

With this setup, you can efficiently develop and manage multiple applications and packages within a single repository using Turborepo. The shared code in the `packages/ui` directory allows for code reuse and consistency across your projects.

 

 

## Exploring Root `package.json`

The root `package.json` file is located at the top level of your Turborepo project and serves as the central configuration file for your monorepo. It contains scripts and dependencies that are shared across all the packages and applications within the monorepo.

 

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F68d772f1-ff31-4916-ae2e-35d8f895bb6d%2FUntitled.png?table=block&id=bf19dce4-eaef-4a5a-9ccd-ef1c44959d50&cache=v2)

 

Let's break down each script:

1. `build` **Script**:
   
   1. - When you run `npm run build` in the root of your Turborepo project, it executes the command `turbo run build`.
      
      <!--THE END-->
      
      - This command tells Turborepo to run the `build` script defined in each package and application within the monorepo.
      
      <!--THE END-->
      
      - Turborepo goes into all the `packages/*` and `apps/*` directories and runs `npm run build` inside them, provided they have a `build` script defined in their respective `package.json` files.
      
      <!--THE END-->
      
      - The `build` script is typically used to compile, transpile, or bundle the code in each package and application.

<!--THE END-->

2. `dev` **Script**:
   
   1. - Running `npm run dev` in the root of your Turborepo project executes the command `turbo run dev --parallel`.
      
      <!--THE END-->
      
      - This command tells Turborepo to run the `dev` script in each package and application within the monorepo, in parallel.
      
      <!--THE END-->
      
      - Turborepo goes into all the `packages/*` and `apps/*` directories and runs `npm run dev` inside them, provided they have a `dev` script defined in their respective `package.json` files.
      
      <!--THE END-->
      
      - The `dev` script is typically used to start the development server or watch for changes in each package and application.

<!--THE END-->

3. `lint` **Script**:
   
   1. - When you run `npm run lint` in the root of your Turborepo project, it executes the command `turbo run lint`.
      
      <!--THE END-->
      
      - This command tells Turborepo to run the `lint` script defined in each package and application within the monorepo.
      
      <!--THE END-->
      
      - Turborepo goes into all the `packages/*` and `apps/*` directories and runs `npm run lint` inside them, provided they have a `lint` script defined in their respective `package.json` files.
      
      <!--THE END-->
      
      - The `lint` script is typically used to perform static code analysis and check for potential errors or style violations in each package and application.

> By defining these scripts in the root `package.json` file, you can easily run the corresponding tasks across all the packages and applications in your monorepo using a single command.

 

 

## Exploring `packages/ui`

Let's explore the `packages/ui` directory in a Turborepo project and understand its structure and purpose.

#### **1. package.json**

The `package.json` file in the `packages/ui` directory is used to configure and manage the UI package within the monorepo. It contains metadata, dependencies, and scripts specific to the UI package.

 

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2Fc586b86a-0adc-4946-80ad-ef12c48099e3%2FUntitled.png?table=block&id=c4fce2ec-a330-4241-a236-4ad48c66191b&cache=v2)

 

One important aspect of the `package.json` file in the UI package is the `exports` field. In the example you provided, the `exports` field is defined as follows:

```json
{
  "exports": {
    "./button": "src/button.tsx",
    "./card": "src/card.tsx",
    "./code": "src/code.tsx"
  }
}
```

The `exports` field specifies the public API of the UI package. It defines the entry points for other packages or applications to import and use the components from the UI package.

In this case, the UI package exposes three components:

- `./button`: Mapped to the `src/button.tsx` file.

<!--THE END-->

- `./card`: Mapped to the `src/card.tsx` file.

<!--THE END-->

- `./code`: Mapped to the `src/code.tsx` file.

Other packages or applications can import these components using the specified paths, for example:

```tsx
import { Button } from 'ui/button';
import { Card } from 'ui/card';
import { Code } from 'ui/code';
```

#### **2. src/button.tsx**

The `src/button.tsx` file contains the implementation of the Button component. Let's break down the code snippet you provided:

```tsx
"use client"

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  appName: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className, appName }) => {
  return (
    <button
      className={className}
      onClick={() => alert(`Hello from your ${appName} app`)}
    >
      {children}
    </button>
  );
};
```

- The `"use client"` directive at the top of the file indicates that this component is a client-side component in a Next.js application.

<!--THE END-->

- The `ButtonProps` interface defines the props that the Button component expects, including `children`, `className`, and `appName`.

<!--THE END-->

- The `Button` component is exported as a functional component that accepts the props defined in `ButtonProps`.

<!--THE END-->

- Inside the component, a `<button>` element is rendered with the provided `className` and an `onClick` event handler.

<!--THE END-->

- The `onClick` event handler displays an alert with a message that includes the `appName` prop.

<!--THE END-->

- The `children` prop is rendered inside the `<button>` element, allowing the content of the button to be customized.

This Button component can be imported and used in other packages or applications within the monorepo.

 

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2Fee84dad4-4a7b-45a8-8c9a-ca4730595280%2FUntitled.png?table=block&id=825d239d-3c81-4d14-b761-f31ae67bfeb0&cache=v2)

 

#### [3. turbo folder](#a5571612196d492ab4262e25f2174669 "3. turbo folder")**3. turbo folder**

The `turbo` folder is a special folder introduced by Turborepo for code generation purposes. It is used to store configuration files and templates related to code generation within the monorepo.

Code generation in Turborepo allows you to automatically generate boilerplate code, such as components, pages, or API routes, based on predefined templates. This can help maintain consistency and speed up development by reducing manual repetitive tasks.

The `turbo` folder typically contains configuration files that define the code generation templates and their associated settings. These configuration files are written in a specific format (e.g., YAML or JSON) and specify the structure and content of the generated code.

For more details on code generation in Turborepo, you can refer to the official documentation: [https://turbo.build/repo/docs/core-concepts/monorepos/code-generation](https://turbo.build/repo/docs/core-concepts/monorepos/code-generation)

 

> By leveraging the `packages/ui` directory and its components, you can create a reusable UI library that can be shared across multiple applications within your Turborepo monorepo. The `turbo` folder and code generation capabilities further enhance the development experience by automating repetitive tasks and maintaining consistency throughout the monorepo.

## Exploring apps/web

Let's explore the `apps/web` directory and understand how it utilizes components from the `packages/ui` module.

### 1. Dependencies

As mentioned, `apps/web` is a simple Next.js application. However, it leverages UI components from the `packages/ui` module, which is a shared UI library within the monorepo.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2F887d149c-2839-433b-ac39-aeaae0d0ef13%2FUntitled.png?table=block&id=b2e25b6d-95f6-493a-83a4-581d9adbd879&cache=v2)

### 2. Exploring package.json

In the `package.json` file of the `apps/web` directory, you'll notice that `@repo/ui` is listed as a dependency:

```json
{
  "dependencies": {
    "@repo/ui": "*",
    "next": "^14.1.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

The `"@repo/ui": "workspace:*"` entry indicates that the `apps/web` application depends on the `packages/ui` package within the same monorepo workspace. This allows the `apps/web` application to import and use the UI components defined in the `packages/ui` module.

### 3. Exploring page.tsx

The `page.tsx` file is a Next.js page component that demonstrates the usage of the `Button` component from the `packages/ui` module.

Here's an example of how the `Button` component might be imported and used in the `page.tsx` file:

```tsx
import { Button } from '@repo/ui/button';
import styles from "./page/module.css";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Web App</h1>
      
      <Button appName="Web" className={styles.button}>
        Click me
      </Button>
      
    </div>
  );
}
```

In this example:

- The `Button` component is imported from `@repo/ui/button`, which corresponds to the `packages/ui/src/button.tsx` file defined in the `exports` field of the `packages/ui` package.
- The `Button` component is used within the `HomePage` component, passing in the required props:
  - `appName="Web"`: This prop is used to personalize the alert message displayed when the button is clicked.
  - `className={styles.button}`: This prop applies imported styles to the button using Tailwind CSS classes.
  - The content `Click me` is passed as the `children` prop, which will be rendered inside the button.

By importing and using the `Button` component from the `packages/ui` module, the `apps/web` application can leverage the shared UI components without duplicating code or maintaining separate implementations.

### Shared Components

The same `Button` component can be used by other applications within the monorepo, such as the `apps/docs` website. This promotes code reuse and consistency across different parts of the project.

For example, in the `apps/docs` application, the `Button` component can be imported and used in a similar manner:

```tsx
import { Button } from '@repo/ui/button';

export default function DocsPage() {
  return (
    <div>
      <h1>Documentation</h1>
      <Button appName="Docs" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Read More
      </Button>
    </div>
  );
}
```

In this case, the `Button` component is imported from the same `packages/ui` module, but with different prop values (e.g., `appName="Docs"` and different styles).

---

## Adding a New Page

### 1. Create a new component in `packages/ui/src`

First, we need to create a new file `admin.tsx` inside the `packages/ui/src` directory. This file will contain the implementation of the `Admin` component.

```tsx
// packages/ui/src/admin.tsx
"use client";

export const Admin = () => {
  return <h1>hi from admin component</h1>;
};
```

In this example, we're exporting a simple functional component called `Admin` that renders an `<h1>` element with the text "hi from admin component".

### 2. Add the component to exports in `packages/ui/package.json`

Next, we need to add the `Admin` component to the `exports` field in the `packages/ui/package.json` file, so that it can be imported and used by other applications within the monorepo.

```json
{
  "exports": {
    "./button": "src/button.tsx",
    "./card": "src/card.tsx",
    "./code": "src/code.tsx",
    "./admin": "src/admin.tsx"
  }
}
```

By adding `"./admin": "src/admin.tsx"` to the `exports` field, we're exposing the `Admin` component as part of the public API of the `packages/ui` module.

### 3. Create `apps/web/app/admin/page.tsx`

Now, we can create a new page in the `apps/web` application that will use the `Admin` component from the `packages/ui` module.

Create a new file `apps/web/app/admin/page.tsx` with the following content:

```tsx
import { Admin } from "@repo/ui/admin";

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>
      <Admin />
    </div>
  );
}
```

In this file, we're importing the `Admin` component from `@repo/ui/admin` (which maps to the `packages/ui/src/admin.tsx` file) and using it within the `AdminPage` component.

### 4. Run the development server

To see the new page in action, you can run the development server by executing the following command in the root directory or the `apps/web` directory:

```bash
npm run dev
```

Once the development server is running, you can visit `http://localhost:3000/admin` in your web browser to see the new `AdminPage` component, which includes the `Admin` component from the `packages/ui` module.

### Using the `packages/ui/turbo/generators`

Turborepo provides a code generation feature that can automate the process of creating new components and files. You can use the `npx gen react-component` command to generate a new React component within the `packages/ui` module.

When you run `npx gen react-component`, Turborepo will prompt you for the component name and other details. It will then generate the necessary files and update the `package.json` file with the new component export.

By leveraging the code generation feature, you can streamline the process of creating new components and ensure consistency across the monorepo.

> **Summary:** We've added a new page to the `apps/web` Next.js website by creating a new `Admin` component in the `packages/ui` module, exposing it through the `exports` field in the `package.json` file, and using it within the `AdminPage` component. Additionally, we've explored the code generation feature provided by Turborepo, which can further simplify the process of creating new components.

---

## Exploring turbo.json

The `turbo.json` file is a configuration file used by Turborepo to define the build pipeline and task dependencies within a monorepo. It plays a crucial role in orchestrating the execution of tasks across different packages and applications.

Here's an example of what a `turbo.json` file might look like:

```json
{
  "$schema": "https://turborepo.org/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

Let's break down the different sections of this file:

### 1. Schema Definition
The `"$schema"` field specifies the URL of the JSON schema that defines the structure and properties of the `turbo.json` file. This helps with validation and autocompletion in code editors.

### 2. Pipeline
The `"pipeline"` object defines the tasks that Turborepo can execute and their dependencies:

- **`"build"`**: This task is responsible for building the packages and applications within the monorepo. The `"dependsOn": ["^build"]` property specifies that this task depends on the `build` tasks of its dependencies (denoted by the `^` prefix). The `"outputs": ["dist/**"]` property indicates that the outputs of this task will be stored in the `dist` directory and its subdirectories.

- **`"test"`**: This task is responsible for running tests. It `"dependsOn"` the `build` task, meaning that the tests will be executed after the packages and applications have been built.

- **`"lint"`**: This task is responsible for linting the codebase. It `"dependsOn"` the `lint` tasks of its dependencies (denoted by `^lint`).

- **`"dev"`**: This task is likely used for running the development server. The `"cache": false` property tells Turborepo not to cache the outputs of this task, as it is a long-running process. The `"persistent": true` property indicates that this task is a persistent, long-running process, and other tasks should not depend on it.

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fdd624914-6876-4b58-9694-424f7aa5e22a%2Feda2f219-665c-4008-a3fc-c00d82dc7fc2%2FUntitled.png?table=block&id=69beec44-9852-41db-a532-8251b3946a8c&cache=v2)

The `turbo.json` file allows you to define the tasks and their dependencies in a declarative way. Turborepo uses this information to optimize the execution of tasks, leveraging caching, parallelization, and dependency graph awareness.

For example, when you run `turbo build`, Turborepo will execute the `build` task for each package and application in the correct order, based on the defined dependencies. It will also cache the outputs of the `build` task, so that subsequent runs can reuse the cached outputs if the inputs haven't changed, resulting in faster build times.

Similarly, when you run `turbo test`, Turborepo will first execute the `build` task (if necessary), and then run the `test` task for each package and application that depends on the `build` task.

---

## Adding React Projects

### 1. Navigate to the `apps` folder

First, navigate to the `apps` folder within your Turborepo monorepo:

```bash
cd apps
```

### 2. Create a fresh Vite app

We'll use the `create-vite` command to create a new Vite-based React application:

```bash
npm create vite@latest
```

Follow the prompts to specify the project name, package manager (e.g., npm or pnpm), and other options. Once the project is created, navigate into the project directory.

### 3. Update `package.json` to include `@repo/ui` as a dependency

Open the `package.json` file in the newly created Vite app and add `@repo/ui` as a dependency:

```json
{
  "dependencies": {
    "@repo/ui": "*"
  }
}
```

This will allow your Vite app to import and use components from the `packages/ui` module.

### 4. Run `npm install` in the root folder

Navigate back to the root folder of your Turborepo monorepo and run `npm install` to install the new dependencies:

```bash
cd ..
npm install
```

### 5. Run `npm run dev`

To start the development server for your Turborepo monorepo, including the new Vite app, run:

```bash
npm run dev
```

This will start the development servers for all the applications and packages within your monorepo.

### 6. Import and use components from `@repo/ui`

In your Vite app, you can now import and use components from the `packages/ui` module. For example, in your `App.jsx` file, you can import and render the `Button` component:

```jsx
import { Button } from '@repo/ui/button';

function App() {
  return (
    <div>
      <h1>My Vite App</h1>
      <Button appName="Vite">Click me</Button>
    </div>
  );
}

export default App;
```

### 7. Add a `turbo.json` to the Vite app folder

To ensure that Turborepo correctly handles the build outputs for your Vite app, you can create a `turbo.json` file in the Vite app's directory. This file will override the `outputs` object for this specific workspace.

Create a `turbo.json` file in your Vite app's directory with the following content:

```json
{
  "extends": ["//"],
  "pipeline": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

This configuration tells Turborepo to treat the `dist` directory and its subdirectories as the build outputs for your Vite app.

> **Summary:** By following these steps, you've successfully added a new React project (Vite app) to your Turborepo monorepo and integrated it with the shared `packages/ui` module. You can now develop and build your Vite app alongside the other applications and packages within the monorepo, leveraging the shared UI components and benefiting from Turborepo's caching and optimization features.

---

## Caching in Turborepo

One of the key features that make Turborepo fast and efficient is its caching mechanism. Turborepo intelligently caches the outputs of tasks (such as build, test, and lint) across different builds, allowing it to skip redundant work and reuse cached results when the inputs haven't changed.

### Caching in Action

To observe caching in action, follow these steps:

1. Navigate to the root directory of your Turborepo project.

2. Run the `npm run build` command to build your project:

```bash
npm run build
```

This command will execute the `build` task for all packages and applications within your monorepo, generating the necessary build artifacts.

3. Run the `npm run build` command again:

```bash
npm run build
```

You'll notice that the second time you run the `build` command, it executes almost instantly. This is because Turborepo has cached the outputs of the `build` task from the previous run, and since the inputs (source files, dependencies, etc.) haven't changed, it can reuse the cached results instead of rebuilding everything from scratch.

### Exploring the Cache

Turborepo stores its cache artifacts in the `node_modules/.cache/turbo` directory within your project. You can explore this directory to see the cached files and their contents.

1. Navigate to the `node_modules/.cache/turbo` directory:

```bash
cd node_modules/.cache/turbo
```

2. List the contents of the directory:

```bash
ls
```

You'll see a list of files with names that look like hashes (e.g., `78awdk123.tar.zst`). These are the cached artifacts for different tasks.

3. To inspect the contents of a cached artifact, you can use the `tar` command with the `unzstd` compression program:

```bash
tar --use-compress-program=unzstd -xvf 78awdk123.tar.zst
```

This command will extract the contents of the `78awdk123.tar.zst` file, allowing you to explore the cached outputs, including build artifacts and log files.

### How Caching Works

Turborepo's caching mechanism works by calculating a hash based on the inputs of a task (source files, dependencies, environment variables, etc.). When you run a task, Turborepo checks if a cached artifact with the same hash exists. If it does, Turborepo skips executing the task and instead replays the cached outputs, including logs and build artifacts.

If the inputs have changed since the last run, Turborepo will detect a cache miss and execute the task from scratch, generating new outputs and caching them for future use.

By leveraging caching, Turborepo can significantly reduce build times, especially in large monorepos with many packages and applications. It avoids redundant work and allows developers to iterate quickly, as only the parts of the codebase that have changed need to be rebuilt.

### Clearing the Cache

If you ever need to clear Turborepo's cache, you can simply delete the `node_modules/.cache/turbo` directory:

```bash
rm -rf node_modules/.cache/turbo
```

This will force Turborepo to rebuild everything from scratch on the next run, as there will be no cached artifacts available.

---

## Adding a Node.js App

### 1. Create the `apps/backend` directory

First, create a new directory for your Node.js app within the `apps` folder:

```bash
mkdir apps/backend
cd apps/backend
```

### 2. Initialize an empty TypeScript repository

Initialize a new npm package and set up TypeScript:

```bash
npm init -y
npx tsc --init
```

### 3. Use the base TypeScript configuration

Replace the contents of the generated `tsconfig.json` file with the following configuration, which extends the base TypeScript configuration from the `@repo/typescript-config` package:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "lib": ["ES2015"],
    "module": "CommonJS",
    "outDir": "./dist"
  },
  "exclude": ["node_modules"],
  "include": ["."]
}
```

### 4. Install dependencies

Install the required dependencies for your Node.js app, such as Express:

```bash
npm install express @types/express
```

### 5. Create the `src/index.ts` file

Create a new file `src/index.ts` and add a basic Express server:

```typescript
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "hello world"
  });
});
```

### 6. Update the `turbo.json` file

In the `apps/backend` directory, create a `turbo.json` file to configure the build outputs for your Node.js app:

```json
{
  "extends": ["//"],
  "pipeline": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

### 7. Install esbuild

Install the `esbuild` package, which will be used to build your Node.js app:

```bash
npm install esbuild
```

### 8. Add the build script to `package.json`

In the `apps/backend/package.json` file, add a `build` script that uses `esbuild` to build your Node.js app:

```json
{
  "scripts": {
    "build": "esbuild src/index.ts --platform=node --bundle --outdir=dist"
  }
}
```

### 9. Build and run the Node.js app

You can now build and run your Node.js app using Turborepo:

```bash
# Build the app
npm run build

# Run the app
node dist/index.js
```

You should see the "hello world" message when you visit `http://localhost:3000` in your web browser.

### Integrating with Turborepo

To integrate your Node.js app with the rest of your Turborepo monorepo, you can update the root `turbo.json` file to include the `apps/backend` workspace:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false
    }
  }
}
```

Now, when you run `npm run build` or `npm run dev` from the root directory, Turborepo will also build or start your Node.js app alongside the other applications and packages in your monorepo.

> **Summary:** By following these steps, you've successfully added a Node.js app to your Turborepo monorepo and configured it to use `esbuild` for building. You can now develop and build your Node.js app alongside the other applications and packages within the monorepo, leveraging the shared configurations and benefiting from Turborepo's caching and optimization features.

---

## Adding a Common Module

### 1. Navigate to the `packages` directory

First, navigate to the `packages` directory within your Turborepo monorepo:

```bash
cd packages
```

### 2. Create the `common` directory

Create a new directory for the common module:

```bash
mkdir common
cd common
```

### 3. Initialize an empty Node.js project

Initialize a new npm package and set up TypeScript:

```bash
npm init -y
npx tsc --init
```

### 4. Change the package name to `@repo/common`

Open the `package.json` file and update the `name` field to `@repo/common`:

```json
{
  "name": "@repo/common",
  // ...
}
```

### 5. Export something from `src/index.ts`

Create a new file `src/index.ts` and export a simple value or function:

```typescript
export const NUMBER = 1;
```

### 6. Add `@repo/common` as a dependency in other applications

In the `package.json` files of the applications that need to use the `@repo/common` module (e.g., Next.js app, React app, Node.js app), add `@repo/common` as a dependency:

```json
{
  "dependencies": {
    "@repo/common": "*"
  }
}
```

### 7. Import and use the exported value or function

In the applications that depend on `@repo/common`, you can now import and use the exported value or function. For example, in a Next.js page component:

```tsx
import { NUMBER } from '@repo/common';

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>The number is: {NUMBER}</p>
    </div>
  );
}
```

### 8. Run `npm install` in the root folder

Navigate back to the root folder of your Turborepo monorepo and run `npm install` to install the new dependencies:

```bash
cd ../..
npm install
```

### 9. Run the applications

You can now run the applications that use the `@repo/common` module, and you should see the expected behavior. For example, if you run the Next.js app with `npm run dev`, you should see the value of `NUMBER` displayed on the home page.

By following these steps, you've successfully added a common module (`@repo/common`) to your Turborepo monorepo. This module can be shared and used by both frontend and backend applications within the monorepo, promoting code reuse and consistency.

> **Summary:** The common module can contain shared utilities, constants, types, or any other code that needs to be accessible across multiple applications. You can continue to expand the functionality of the `@repo/common` module as needed, and it will be automatically available to all applications that depend on it.