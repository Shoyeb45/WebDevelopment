
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "schema.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        mappers: {
          Game: "../_db#GameDB",
          Review: "../_db#ReviewDB",
          Author: "../_db#AuthorDB"
        }
      }
    }
  },
};

export default config;
