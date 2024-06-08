import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

import fs from 'node:fs';
import { URL, fileURLToPath } from 'node:url';

const autoImportPath = fileURLToPath(
  new URL('./.eslintrc-auto-import.json', import.meta.url),
);
const eslintrcAutoImport = JSON.parse(fs.readFileSync(autoImportPath, 'utf8'));

const tsEslint = tseslint
  .config(...tseslint.configs.recommended)
  .map((config) => ({
    ...config,
    // rules: {
    //   ...config.rules,
    //   // 'array-callback-return': 'error',
    // },
    languageOptions: {
      ...config.languageOptions,
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  }));
console.log('🚀 ~ tsEslint:', tsEslint);
const vueEslint = pluginVue.configs['flat/recommended'].map((config) => ({
  ...config,
  rules: {
    ...config.rules,
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index'], // 忽略 index 命名，一般表示页面
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
  },
  languageOptions: {
    ...config.languageOptions,
  },
}));

export default [
  js.configs.recommended,
  ...tsEslint,
  ...vueEslint,
  {
    ...eslintPluginPrettierRecommended,
    rules: {
      ...eslintPluginPrettierRecommended.rules,
      ...eslintConfigPrettier.rules,
      'prettier/prettier': ['error', { endOfLine: 'auto' }], // 自动选择结尾换行
    },
  },
  {
    ignores: ['node_modules/', 'dist/', 'public/', 'src/assets/'],
    languageOptions: {
      ...eslintrcAutoImport,
    },
  },
];
