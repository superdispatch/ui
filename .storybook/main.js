'use strict';

const createBabelConfig = require('../config/createBabelConfig');

module.exports = {
  stories: ['../packages/**/*.stories.{ts,tsx}'],
  addons: [
    'storybook-addon-playroom',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
  ],

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: 'babel-loader',
      options: { cacheDirectory: true, ...createBabelConfig({ docs: true }) },
    });

    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.mainFields = ['module', 'browser', 'main'];

    return config;
  },
};
