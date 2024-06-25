# vue3-template

## 项目概述

使用 vue3 + typescript + eslint + prettier + husky + commitlint + stylelint + lint-staged

## 项目结构

```bash
│  .env.development   // 开发环境配置
│  .env.production    // 生产环境配置
│  .eslintrc-auto-import.json   // 自动导入eslint配置
│  .gitignore   // git忽略文件
│  .ncurc.json    // 检查更新配置
│  .prettierignore    // prettier忽略文件
│  .stylelintignore    // stylelint忽略文件
│  auto-imports.d.ts    // 自动导入声明文件
│  commitlint.config.js   // commitlint配置
│  env.d.ts   // 环境变量声明文件
│  eslint.config.js   // eslint配置
│  index.html   // html模板
│  package.json   // 依赖包
│  pnpm-lock.yaml   // pnpm依赖锁
│  prettier.config.js   // prettier配置
│  README.md
│  stylelint.config.js    // stylelint配置
│  tsconfig.app.json
│  tsconfig.json
│  tsconfig.node.json
│  vite.config.ts   // vite配置
│
├─.husky    // husky配置
│  │  commit-msg
│  │  pre-commit
│
├─.vscode   // vscode配置
│      extensions.json
│      settings.json
│
├─public
│      favicon.ico
│
└─src
    │  App.vue    // 根组件
    │  main.ts    // 入口文件
    │
    ├─api   // api接口
    │  ├─config   // axios配置
    │  │      const.ts    // axios配置常量定义文件
    │  │      index.ts   // axios配置文件
    │  │      methods.ts    // axios请求方法
    │  │      type.ts
    │  │
    │  └─methods    // api接口方法
    │          user.ts
    │
    ├─router    // 路由
    │      index.ts
    │
    ├─stores    // 状态管理
    │      login.ts
    │
    └─views   // 视图
            AboutView.vue
            HomeView.vue
```

## 插件

- vite
- vue-router
- pinia
- eslint
  - eslint-plugin-vue
  - eslint-plugin-prettier
  - eslint-config-prettier
  - typescript-eslint
  - ~~vite-plugin-eslint
- prettier
  - prettier-stylelint
- stylelint
  - postcss-html
  - stylelint-config-recess-order
  - stylelint-config-recommended-vue
  - stylelint-config-standard-scss
- husky
- lint-staged
- @commitlint/cli
- @commitlint/config-conventional
- unplugin-auto-import

### eslint

```bash
pnpm add -D eslint eslint-plugin-vue eslint-plugin-prettier eslint-config-prettier eslint-plugin-import-x typescript-eslint
```

#### eslint-config-prettier 9.1.0

> `eslint-config-prettier` 是一个 ESLint 配置，它关闭所有可能与 Prettier 冲突的 ESLint 规则。这样你就可以同时使用 ESLint 和 Prettier，而不会出现冲突，虽然 eslint 9.0 移除了一些样式配置。

#### eslint-plugin-prettier 5.1.3

> 配置 `eslint-plugin-prettier` 时，你的代码将会被 Prettier 格式化，然后 Prettier 的输出将会被 ESLint 检查。如果 Prettier 格式化后的代码与 ESLint 的规则不一致，ESLint 将会报告一个错误。

```js
// package.json
{
  "scripts": {
    "lint:eslint": "eslint . --fix",
  }
}

```

```js
// eslint.config.js
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginImportX from 'eslint-plugin-import-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';
import pluginTs from 'typescript-eslint';
import fs from 'node:fs';
import { URL, fileURLToPath } from 'node:url';

const autoImportPath = fileURLToPath(new URL('./.eslintrc-auto-import.json', import.meta.url));
const eslintrcAutoImport = JSON.parse(fs.readFileSync(autoImportPath, 'utf8'));
const tsEslint = pluginTs.config(...pluginTs.configs.recommended).map((config) => ({
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
    plugins: {
      'import-x': pluginImportX,
    },
  },
  ...tsEslint,
  ...vueEslint,
  pluginJs.configs.recommended,
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
      '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any 类型
      'prettier/prettier': ['error', { endOfLine: 'auto' }], // 自动选择结尾换行

      'array-callback-return': 'error',
      'sort-imports': 'off',

      'import-x/order': [
        'error',
        {
          groups: ['external', 'builtin', 'internal', 'type', 'parent', 'object', 'sibling', 'index'],
        },
      ],
      'import-x/no-cycle': 'error', // 禁止循环引用 暂不支持
      'import-x/no-self-import': 'error', // 禁止自引用 暂不支持
      'no-async-promise-executor': 'off',
    },
    languageOptions: {
      ...eslintrcAutoImport,
    },
  },
  {
    ignores: ['node_modules/', 'dist/', 'public/', 'src/assets/', 'tests/'],
  },
];

```

### prettier/stylelint

```bash
pnpm add -D prettier prettier-stylelint stylelint stylelint-config-recess-order stylelint-config-recommended-vue stylelint-config-standard-scss
```

```js
// package.json
{
  "scripts": {
    "lint:prettier": "prettier --write src/**/*.{ts,vue,js,tsx,jsx,json}",
    "lint:stylelint": "stylelint .",
  }
}


```

```js
// prettier.config.js
export default {
  semi: true,
  singleQuote: true,
  endOfLine: 'auto',
  printWidth: 140,
};

```

```js
// stylelint.config.js
export default {
  root: true,
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  ignoreFiles: ['**/*', '!src/**/*', 'src/**/*.{js,jsx,ts,tsx}'],
  overrides: [
    {
      files: ['src/**/*.vue'],
      extends: ['stylelint-config-standard-scss', 'stylelint-config-recommended-vue'],
      rules: {},
    },
  ],
};

```

### commitlint

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional
```

```js
// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 提交类型枚举，git提交type必须是以下类型
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新增功能
        'fix', // 修复缺陷
        'docs', // 文档变更
        'style', // 代码格式（不影响功能，例如空格、分号等格式修正）
        'refactor', // 代码重构（不包括 bug 修复、功能新增）
        'perf', // 性能优化
        'test', // 添加疏漏测试或已有测试改动
        'build', // 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
        'ci', // 修改 CI 配置、脚本
        'revert', // 回滚 commit
        'chore', // 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
      ],
    ],
    'subject-case': [0], // subject大小写不做校验
  },
};

```

### lint-staged

```bash
pnpm add -D lint-staged
```

```js
// package.json
{
  "scripts": {
    "lint-staged": "lint-staged",
  },
  "lint-staged": {
    "*.{js,ts,jsx,tsx,vue}": [
      "eslint --fix",
      "prettier --write",
      "stylelint --fix"
    ]
  }
}
```

### unplugin-auto-import配置

```bash
pnpm add -D unplugin-auto-import
```

```ts
// vite.config.ts;
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import { URL, fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue', 'vue-router'],
      defaultExportByFilename: false,
      dts: fileURLToPath(new URL('./auto-imports.d.ts', import.meta.url)),
      ignoreDts: ['ignoredFunction', /^ignore_/],
      vueTemplate: false,
      injectAtEnd: true,
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4523/m1/4641452-4292045-default',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});

```

> 注意：第一次配置时开启配置*dts：true*, *eslintrc: { enabled: true }*, 然后运行 `pnpm run dev` 自动生成`auto-imports.d.ts`和`.eslintrc-auto-import.json`文件。启动后在设置*dts: './auto-import.d.ts'*和*eslintrc: { enabled: true, filepath: './.eslintrc-auto-import.json' }*。

## ESLint配置检查器介绍

> npx eslint --inspect-config
