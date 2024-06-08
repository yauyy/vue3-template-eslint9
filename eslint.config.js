import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importX from 'eslint-plugin-import-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';
import fs from 'node:fs';
import { URL, fileURLToPath } from 'node:url';
import pluginTs from 'typescript-eslint';

const autoImportPath = fileURLToPath(
  new URL('./.eslintrc-auto-import.json', import.meta.url),
);
const eslintrcAutoImport = JSON.parse(fs.readFileSync(autoImportPath, 'utf8'));
const tsEslint = pluginTs
  .config(...pluginTs.configs.recommended)
  .map((config) => ({
    ...config,
    languageOptions: {
      ...config.languageOptions,
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  }));
const vueEslint = pluginVue.configs['flat/recommended'];

export default [
  {
    ignores: ['node_modules/', 'dist/', 'public/', 'src/assets/'],
  },
  ...tsEslint,
  ...vueEslint,
  pluginJs.configs.recommended,
  {
    plugins: {
      'import-x': importX,
    },
  },
  {
    ...eslintPluginPrettierRecommended,
    rules: {
      ...eslintPluginPrettierRecommended.rules,
      ...eslintConfigPrettier.rules,
    },
  },
  {
    files: ['src/**/*.{js,ts,jsx,tsx,vue}'],
    rules: {
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['index'], // 忽略 index 命名，一般表示页面
        },
      ],
      'prettier/prettier': ['error', { endOfLine: 'auto' }], // 自动选择结尾换行

      'array-callback-return': 'error',
      'sort-imports': 'off',

      'import-x/order': [
        'error',
        {
          groups: [
            'internal',
            'builtin',
            'type',
            'parent',
            'object',
            'external',
            'sibling',
            'index',
          ],
        },
      ],
    },
    languageOptions: {
      ...eslintrcAutoImport,
    },
  },
];
