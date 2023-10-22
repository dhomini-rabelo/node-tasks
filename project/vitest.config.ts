/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globalSetup: 'tests/__utils__/setup/mongoose/global.ts',
  },
})
