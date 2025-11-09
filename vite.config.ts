// Path 
import path from "path"
// Standart React Config
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Tailwind Css
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
        tailwindcss(),
  ],
  //-------------------
  //Shadcn UI
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
  //--------------------

})
