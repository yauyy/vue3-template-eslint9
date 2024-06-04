import antfu from '@antfu/eslint-config';

export default antfu({
  vue: true,
  typescript: true,
  formatters: {
    css: true,
    html: true,
  },
  files: ['**/*.{ts,js,vue}'],
  rules: {
    'no-console': 'warn',
    'semi': 'error',
    'style/semi': 'off',
  },
});
