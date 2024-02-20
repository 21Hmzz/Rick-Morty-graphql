import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "https://rickandmortyapi.com/graphql",
    documents: ["src/**/*.vue"],
    generates: {
        "./src/__generated__/": {
            preset: "client",
        },
    },
};

export default config;