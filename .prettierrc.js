/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'always',
  singleQuote: true,
  trailingComma: 'es5',
  useTabs: false,
  overrides: [
    {
      files: ['.taprc'],
      options: { parser: 'yaml' },
    },
  ],
};
module.exports = config;
