import { fileURLToPath } from 'node:url';
import path from 'node:path';
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(
  ...tseslint.configs.strict,
  eslint.configs.recommended,
  {
    files: ['app/**/*.{ts,js}'],
    ignores: ['dist/', 'node_modules/', './**/*.config.ts'],
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'error',
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      globals: {
				...globals.browser,
        ...globals.node,
			},
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
);