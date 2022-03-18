/** @type {Partial<import('eslint').Linter.RulesRecord>} */
const rules = {
  curly: ['error', 'multi-line'],
  eqeqeq: ['error', 'smart'],
  'capitalized-comments': ['off'],
  'no-eq-null': ['off'],
  // 'import/extensions': 'off',
  // 'node/file-extension-in-import': 'off',
  // 'unicorn/prefer-node-protocol': 'off',
  // 'unicorn/no-array-reduce': 'off',
  // 'unicorn/prefer-spread': 'off',
};
/** @type {Partial<import('eslint').Linter.RulesRecord>} */
const tsRules = {
  ...rules,
  '@typescript-eslint/consistent-indexed-object-style': [
    'error',
    'index-signature',
  ],
  '@typescript-eslint/padding-line-between-statements': ['off'],
};
/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['xo', 'prettier', 'plugin:prettier/recommended'],
  parserOptions: {
    project: false,
  },
  rules,

  overrides: [
    {
      files: ['src/**/*.ts'],
      parserOptions: {
        project: 'src/tsconfig.json',
      },
      extends: [
        'xo',
        'xo-typescript',
        'prettier',
        'plugin:prettier/recommended',
      ],
      rules: tsRules,
    },
    {
      files: ['*.config.js'],
      rules: {
        'unicorn/prefer-module': 'off',
        '@typescript-eslint/no-throw-literal': ['off'],
      },
    },
  ],
};
module.exports = config;
