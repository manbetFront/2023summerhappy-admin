// ESlint 检查配置
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // plugins: [
  //   'vue',
  //   'html'
  // ],
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
  ],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    // "indent": [1, 2],
    // "no-console": 0,
    // "no-debugger": 0,
    // "no-unused-vars": 1,
    // // "linebreak-style": 0,
    // "no-empty": 1,
    "quotes": [
      1,
      "single"
    ],
    // "semi": [
    //   1,
    //   "never"
    // ]
  }
}
