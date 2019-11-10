'use strict';

module.exports = {
  presets: ['@babel/typescript', '@babel/react'],
  plugins: [
    './tools/babel-plugin-condesandbox-url',
    ['@babel/plugin-proposal-optional-chaining', { loose: true }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: true }],
  ],
};
