module.exports = {
  extends: ['universe', 'universe/shared/typescript-analysis', 'plugin:react-hooks/recommended'],
  plugins: ['unused-imports'],
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
    'unused-imports/no-unused-imports': 'warn',
    'no-unused-vars': 'off'
  }
}
