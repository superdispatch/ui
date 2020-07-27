'use strict';

const path = require('path');
const createBabelConfig = require('../config/createBabelConfig');

module.exports = {
  stories: ['../packages/**/*.stories.{ts,tsx}'],
  addons: [
    'storybook-addon-playroom',
    '@storybook/addon-docs/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-actions/register',
  ],

  webpackFinal: async (config) => {
    config.module.rules.push({
      enforce: 'pre',
      test: /\.stories\.(ts|tsx)?$/,
      loader: '@storybook/source-loader',
      exclude: [/node_modules/],
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: 'react-docgen-typescript-loader',
      options: { tsconfigPath: path.resolve(__dirname, '..', 'tsconfig.json') },
    });

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
