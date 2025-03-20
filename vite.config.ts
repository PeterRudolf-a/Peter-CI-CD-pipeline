import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import istanbul from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		react(),
		istanbul({
			exclude: ["node_modules", "dist", "test", "cypress"],
			cypress: true,
			requireEnv: false,
      forceBuildInstrument: true
		}),
	],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/_tests_/setup.ts'
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true
      }
    }
  }
})
