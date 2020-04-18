'use strict';

module.exports = () => (api) => {
  const isTest = api.env('test');

  api.cache(() => JSON.stringify({ isTest }));

  return {
    presets: [
      [
        '@superdispatch/babel-preset',
        { targets: 'esmodules', optimize: { pureCalls: true } },
      ],
    ],
    plugins: [
      require.resolve('../tools/babel-plugin-inject-display-name'),
      ['babel-plugin-optimize-clsx', { libraries: ['clsx'] }],
    ],
  };
};
