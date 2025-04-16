import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path'; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), 
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@features" : path.resolve(__dirname,"./src/features"),
      "@utils" : path.resolve(__dirname,"./src/utils"),
      "@services" : path.resolve(__dirname,"./src/services"),
      "@constants" : path.resolve(__dirname,"./src/constants"),
      "@assets" : path.resolve(__dirname,"./src/assets"),
      "@hooks" : path.resolve(__dirname,"./src/hooks"),
      "@legal" : path.resolve(__dirname,"./src/legal"),
      "@layout" : path.resolve(__dirname,"./src/layout")
    },
  },
});