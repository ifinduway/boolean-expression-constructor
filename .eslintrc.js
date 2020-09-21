module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': ['error', 4],
    'no-unused-vars': 'warn',
    'max-len': 'off',
    'import/extensions': 'off',
    'consistent-return': 'warn',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
