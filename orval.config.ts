import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "http://localhost:3001/docs-json/",
    },
    output: {
      target: "src/shared/api/generated.ts",
      client: "react-query",
      mode: "single",
      override: {
        mutator: {
          path: "src/shared/api/instance.ts",
          name: "customInstance",
        },
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
    },
  },
});
