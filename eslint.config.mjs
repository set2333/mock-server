import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

const files = ['src/*.ts'];

export default [
  {
    files,
    rules: {
      ...pluginJs.configs.recommended.rules,
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended.map((config) => ({ ...config, files })),
];
