'use strict';

module.exports = {
  stories: ['../**/*.stories.ts'],
  addons: [
    '@storybook/addon-a11y/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-viewport/register',
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        cacheDirectory: true,
        cacheCompression: false,
        configFile: require.resolve('./.babelrc'),
      },
    });

    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.mainFields = ['module', 'browser', 'main'];

    return config;
  },
};
