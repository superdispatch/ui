'use strict';

module.exports = ({ isDocs = false } = {}) => ({
  presets: ['@babel/typescript', '@babel/react'],
  plugins: [
    isDocs && require.resolve('../tools/babel-plugin-condesandbox-url'),
    ['babel-plugin-optimize-clsx', { libraries: ['clsx'] }],
    ['@babel/plugin-transform-runtime', { useESModules: false }],
    ['@babel/plugin-proposal-optional-chaining', { loose: true }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: true }],
  ].filter(Boolean),
});
