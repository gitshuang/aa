// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb',
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'config/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // 'no-unused-vars': [
    //   'warn',
    //   {
    //     args: 'none',
    //     ignoreRestSiblings: true,
    //   },
    // ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-param-reassign': "warn",
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'react/no-array-index-key': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-noninteractive-element-interactions': [
      'error',
      {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
      },
    ],
    // 换行风格
    'linebreak-style': [0 ,"windows"], 
    // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    "no-shadow": 0,
    // 强制驼峰法命名
    // "camelcase": 0,
    // 标识符不能以_开头或结尾
    // "no-underscore-dangle": 0, 
  }
}
