import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/netflix-clone/", // Thay bằng tên thư mục trên hosting của bạn
  build: {
    outDir: "dist", // Thư mục xuất file sau khi build
    assetsDir: "assets", // Nơi chứa file tĩnh như ảnh, CSS, JS
  },
  server: {
    proxy: {
      "/api": {
        target: "https://phimapi.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
