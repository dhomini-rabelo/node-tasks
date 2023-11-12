/// <reference types="vitest" />
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vitest'],
      dts: true, // generate TypeScript declaration
    }),
  ],
  test: {
    globalSetup: 'tests/setup/mongoose/global.ts',
    setupFiles: ['tests/setup/extend.ts'],
    alias: {
      '@': '/src',
      '@tests': '/tests',
    },
  },
})
