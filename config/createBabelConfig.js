'use strict';

module.exports = ({ isDocs = false } = {}) => api => {
  const isTest = api.env('test');

  api.cache(() => JSON.stringify({ isTest, isDocs }));

  return {
    presets: [
      '@babel/react',
      '@babel/typescript',
      isTest && [
        '@babel/preset-env',
        { modules: 'cjs', targets: { node: true } },
      ],
    ].filter(Boolean),
    plugins: [
      isDocs && !isTest && require.resolve('../tools/babel-plugin-csb'),
      ['babel-plugin-optimize-clsx', { libraries: ['clsx'] }],
      ['@babel/plugin-transform-runtime', { useESModules: false }],
      ['@babel/plugin-proposal-optional-chaining', { loose: true }],
      ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: true }],
    ].filter(Boolean),
  };
};
