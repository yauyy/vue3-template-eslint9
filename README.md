# vue3-template

vue3 项目模板

## 插件

- vite
- vue-router
- pinia
- eslint
  - eslint-plugin-vue
  - eslint-plugin-prettier
  - eslint-config-prettier
- prettier
  - prettier-stylelint
- stylelint
  - postcss-html
  - stylelint-config-recommended-vue
  - stylelint-config-standard-scss
- lint-staged
- unplugin-auto-import

### eslint-config-prettier 9.1.0

> `eslint-config-prettier` 是一个 ESLint 配置，它关闭所有可能与 Prettier 冲突的 ESLint 规则。这样你就可以同时使用 ESLint 和 Prettier，而不会出现冲突

### eslint-plugin-prettier 5.1.3

> 配置 `eslint-plugin-prettier` 时，你的代码将会被 Prettier 格式化，然后 Prettier 的输出将会被 ESLint 检查。如果 Prettier 格式化后的代码与 ESLint 的规则不一致，ESLint 将会报告一个错误。

### eslint-plugin-vue 9.26.0

```js
// eslint.config.js
import pluginVue from 'eslint-plugin-vue';

export default [
  ...pluginVue.configs['flat/recommended'].map((config) => ({
    ...config,
    files: ['src/**/*.{vue,ts}'], // 指定检查文件
  })),
  {
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
    },
  },
];
```

### unplugin-auto-import配置

```bash
pnpm add -D unplugin-auto-import
```

```ts
// vite.config.ts;
import AutoImport from 'unplugin-auto-import/vite';
export default defineConfig({
  plugins: [
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      // global imports to register
      imports: [
        'vue',
        'vue-router',
        {
          axios: [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
        },
        // example type import
        {
          from: 'vue-router',
          imports: ['RouteLocationRaw'],
          type: true,
        },
      ],

      ignore: [],

      // Enable auto import by filename for default module exports under directories
      defaultExportByFilename: false,

      // Auto import for module exports under directories
      // by default it only scan one level of modules under the directory
      dirs: [],

      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts: fileURLToPath(new URL('./auto-imports.d.ts', import.meta.url)),

      // Array of strings of regexes that contains imports meant to be ignored during
      // the declaration file generation. You may find this useful when you need to provide
      // a custom signature for a function.
      ignoreDts: ['ignoredFunction', /^ignore_/],

      // Auto import inside Vue template
      // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
      vueTemplate: false,

      // Custom resolvers, compatible with `unplugin-vue-components`
      // see https://github.com/antfu/unplugin-auto-import/pull/23/
      resolvers: [
        /* ... */
      ],

      // Inject the imports at the end of other imports
      injectAtEnd: true,

      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: false, // Default `false`
        // provide path ending with `.mjs` or `.cjs` to generate the file with the respective format
        filepath: fileURLToPath(
          new URL('./.eslintrc-auto-import.json', import.meta.url),
        ), // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
  ],
});
```

> 注意：第一次配置时开启配置*dts：true*, *eslintrc: { enabled: true }*, 然后运行 `pnpm run dev` 自动生成`auto-imports.d.ts`和`.eslintrc-auto-import.json`文件。启动后在设置*dts: './auto-import.d.ts'*和*eslintrc: { enabled: true, filepath: './.eslintrc-auto-import.json' }*。

<!-- npx @eslint/config-inspector --