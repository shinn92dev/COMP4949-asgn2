import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const { publicVars } = loadEnv({ prefixes: ["PUBLIC_"] });
export default defineConfig({
    plugins: [pluginReact()],
    source: {
        define: publicVars,
    },
});
