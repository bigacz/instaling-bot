module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'consistent-return': 'off',
    'no-console': 'off',
    'max-classes-per-file': 'off',
    'import/extensions': 'off',
    'prefer-const': 'off',
    'no-empty': 'off',
    'no-param-reassign': 'off',
    'no-await-in-loop': 'off',
  },
};
