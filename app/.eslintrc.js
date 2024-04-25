module.exports = {
    extends: [
      'universe',
      'universe/shared/typescript-analysis',
      'plugin:react-hooks/recommended',
      'plugin:testing-library/react',
      'plugin:jest-dom/recommended'
    ],
    plugins: ['jest', 'testing-library', 'unused-imports'],
    overrides: [
      {
        files: ['*.ts', '*.tsx', '*.d.ts'],
        parserOptions: {
          project: './tsconfig.json'
        }
      }
    ],
    settings: {
      'import/resolver': {
        typescript: {} // this loads <rootdir>/tsconfig.json to ESLint
      }
    },
    /* for lint-staged */
    globals: {
      __dirname: true
    },
    rules: {
      'no-console': 'error',
      'unused-imports/no-unused-imports': 'error',
      'no-unused-vars': 'off'
    }
  }