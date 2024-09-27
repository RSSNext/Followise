// @ts-check
import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig(
  {
    formatting: false,
    lessOpinionated: true,
    ignores: [
      'src/renderer/src/hono.ts',
      'src/hono.ts',
      'packages/shared/src/hono.ts',
      'resources/**',
    ],
    preferESM: false,
  },
  {
    settings: {
      tailwindcss: {
        whitelist: ['center'],
      },
    },
    plugins: {},
    rules: {
      'unicorn/prefer-math-trunc': 'off',
      '@eslint-react/no-clone-element': 0,
      '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 0,
      // NOTE: Disable this temporarily
      'react-compiler/react-compiler': 0,
      'no-restricted-syntax': 0,
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      '@stylistic/jsx-self-closing-comp': 'error',
    },
  },
)
