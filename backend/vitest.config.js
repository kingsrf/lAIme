import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // to use describe(), it(), expect() without importing everywhere
  },
});
