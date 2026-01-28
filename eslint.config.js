const {FlatCompat} = require('@eslint/eslintrc');
const js = require('@eslint/js');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const jsdoc = require('eslint-plugin-jsdoc');
const preferArrow = require('eslint-plugin-prefer-arrow');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/*.js', '**/*.d.ts', '!eslint.config.js']
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {...globals.node},
      parser: tsParser,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.linter.json'],
        tsconfigRootDir: __dirname
      }
    },

    plugins: {
      jsdoc,
      'prefer-arrow': preferArrow,
      '@typescript-eslint': typescriptEslint
    },

    rules: {
      semi: 'warn',

      '@typescript-eslint/array-type': ['error', {
        default: 'array'
      }],

      '@typescript-eslint/return-await': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'off',

      '@typescript-eslint/explicit-function-return-type': [0, {
        allowExpressions: true
      }],

      '@typescript-eslint/no-extraneous-class': ['warn', {
        allowWithDecorator: true
      }],
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'no-duplicate-imports': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/prefer-for-of': 'error'
    }
  },
  ...compat.extends('eslint-config-prettier'),
  {
    files: ['**/__test__/**', '**/__tests__/**', '**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off'
    }
  }
];
