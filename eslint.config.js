import pluginVue from 'eslint-plugin-vue';

export default [
  ...pluginVue.configs['flat/recommended'].map((config) => ({
    ...config,
    files: ['src/**/*.{vue,ts}'], // 指定检查的文件
    rules: {
      ...config.rules,
      'vue/multi-word-component-names': ['error', {
        'ignores': ['index'] // 忽略 index.vue表示页面
      }]
    },
  })),
  {
    // rules: {
    //   'vue/multi-word-component-names': ['error', {
    //     'ignores': ['index'] // 忽略 index.vue表示页面
    //   }]
    // },
  },
];
