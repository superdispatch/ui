'use strict';

module.exports = {
  presets: ['@babel/typescript', '@babel/react'],
  plugins: [
    ['@babel/plugin-proposal-optional-chaining', { loose: true }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: true }],
  ],
};
