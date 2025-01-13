import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['coverage/', 'dist/', 'dist-demo/'],
  },
  js.configs.recommended,
  // ... Your configurations here,
  {
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es6,
        ...globals.node,
      },
    },
  },
];
