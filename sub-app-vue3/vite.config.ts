import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import qiankun from "vite-plugin-qiankun";
const subAppName = "sub-vue3";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), qiankun(subAppName, { useDevMode: true })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3003,
  },
});
