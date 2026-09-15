import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "https://mano.deltateam.uz/swagger/doc.json",
    },

    output: {
      mode: "tags-split",
      target: "./src/api/generated",
      schemas: "./src/api/model",
      client: "react-query",
      httpClient: "axios",

      override: {
        mutator: {
          path: "./src/lib/orval-mutator.ts",
          name: "customInstance",
        },
      },
    },
  },
});
