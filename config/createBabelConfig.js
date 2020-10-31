'use strict';

module.exports = ({ docs = false } = {}) => ({
  presets: [
    [
      '@superdispatch/babel-preset',
      { targets: 'esmodules', optimize: { pureCalls: true } },
    ],
  ],
  plugins: [
    docs && [
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

    docs && require.resolve('../tools/babel-plugin-inject-story-source'),

    [
      require.resolve('../tools/babel-plugin-inject-display-name'),
      { disableNodeEnvCheck: docs },
    ],

    'babel-plugin-object-to-json-parse',
    ['babel-plugin-optimize-clsx', { libraries: ['clsx'] }],
  ].filter(Boolean),
});
