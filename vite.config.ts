
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Le ./ permet au site de marcher peu importe le nom du repo GitHub
  base: './', 
})
