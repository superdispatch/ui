'use strict';

module.exports = () => (api) => {
  const isTest = api.env('test');

  api.cache(() => JSON.stringify({ isTest }));

  return {
    presets: [['@superdispatch/babel-preset', { targets: 'esmodules' }]],
    plugins: [
      'babel-plugin-annotate-pure-calls',
      require.resolve('../tools/babel-plugin-inject-display-name'),
      ['babel-plugin-optimize-clsx', { libraries: ['clsx'] }],
    ],
  };
};
