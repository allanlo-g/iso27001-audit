import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const repoName = 'iso27001-audit';

export default defineConfig({
  plugins: [react()],
  base: '/iso27001-audit/',
})
