import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
  plugins: [devtoolsJson(), tailwindcss(), reactRouter(), tsconfigPaths()],
  // resolve: {
  //   alias: {
  //     'react-dom/server': 'react-dom/server.browser', // or 'react-dom/server.node' if you want Node-specific
  //   },
  // },
});
