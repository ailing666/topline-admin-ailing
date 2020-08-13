module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 不允许用console.
    // 'no-console': 'error', // 如果不遵守规则，就报错。
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'key-spacing': 'off',
    camelcase: 'off', // 强制变量名是驼峰命名法
    // 不必要的;
    semi: 'off' // 不需要去检测这个规则，如果不遵守这个规则也没事。
  }
}
