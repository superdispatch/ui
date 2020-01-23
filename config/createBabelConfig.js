'use strict';

module.exports = ({ isDocs = false } = {}) => api => {
  const isTest = api.env('test');

  api.cache(() => JSON.stringify({ isTest, isDocs }));

  return {
    presets: [['@superdispatch/babel-preset', { targets: 'esmodules' }]],
    plugins: [
      require.resolve('../tools/babel-plugin-inject-display-name'),
      isDocs && !isTest && require.resolve('../tools/babel-plugin-csb'),
      ['babel-plugin-optimize-clsx', { libraries: ['clsx'] }],
    ].filter(Boolean),
  };
};
