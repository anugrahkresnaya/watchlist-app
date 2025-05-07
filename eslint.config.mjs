import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginImport from 'eslint-plugin-import';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react: pluginReact,
      prettier: eslintPluginPrettier,
      'react-hooks': eslintPluginReactHooks,
      import: eslintPluginImport
    },
    settings: {
      react: {
        version: 'detect' // Automatically detect the React version
      }
    },
    rules: {
      // ✅ Prettier Formatting as a Warning
      'prettier/prettier': 'warn',

      // ✅ Code Style Warnings (Not Blocking Commits)
      semi: ['warn', 'always'], // Semicolons required, but only a warning
      quotes: ['warn', 'single'], // Prefer single quotes, but allow double
      indent: ['warn', 2], // Enforce 2-space indentation
      'no-multi-spaces': 'warn', // Prevent multiple spaces

      // ✅ Best Practices (Important but Non-Critical)
      eqeqeq: ['warn', 'always'], // Always use `===` instead of `==`
      curly: 'warn', // Require curly braces for conditionals
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn about unused vars, but allow `_` prefixes
      'no-console': 'warn', // Warn if `console.log` is used (but don’t block commit)
      'no-debugger': 'warn', // Warn if `debugger` is left in code

      // ✅ TypeScript-Specific Warnings
      '@typescript-eslint/no-explicit-any': 'warn', // Avoid `any`, but allow it with warning
      '@typescript-eslint/explicit-module-boundary-types': 'warn', // Warn if function return types are missing
      '@typescript-eslint/no-unused-vars': 'warn', // Unused vars should be warnings, not errors

      // ✅ React-Specific Warnings
      'react/prop-types': 'off', // Warn if prop types are missing (not an error)
      'react/no-unknown-property': 'warn', // Warn about incorrect JSX properties
      'react/react-in-jsx-scope': 'off', // Warn if `React` is missing in JSX files
      'react-hooks/rules-of-hooks': 'warn', // Warn about incorrect hook usage

      // ✅ Import & Module Warnings
      'import/no-unresolved': 'warn', // Warn if imports can't be resolved
      'import/order': ['warn', { groups: ['builtin', 'external', 'internal'] }] // Enforce import order
    }
  }
];
