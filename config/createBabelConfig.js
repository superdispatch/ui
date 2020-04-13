'use strict';

module.exports = () => (api) => {
  const isTest = api.env('test');

  api.cache(() => JSON.stringify({ isTest }));

  return {
    presets: [['@superdispatch/babel-preset', { targets: 'esmodules' }]],
    plugins: [
      require.resolve('../tools/babel-plugin-pure-export-calls'),
      require.resolve('../tools/babel-plugin-inject-display-name'),
      ['babel-plugin-optimize-clsx', { libraries: ['clsx'] }],
      [
        'babel-plugin-direct-import',
        {
          modules: [
            '@material-ui/lab',
            '@material-ui/core',
            '@material-ui/icons',
            '@material-ui/styles',
          ],
        },
      ],
    ].filter(Boolean),
  };
};
