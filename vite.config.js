import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    force: true, // Force optimization even if Vite would otherwise skip it
    esbuildOptions: {
      loader: {
        ".js": "jsx", // Tell Vite's esbuild to treat `.js` files as `.jsx`
      },
    },
  },
});
