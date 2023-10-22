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
    globalSetup: 'tests/__utils__/setup/mongoose/global.ts',
  },
})
