'use strict';

const path = require('path');
const createBabelConfig = require('../config/createBabelConfig');

module.exports = {
  stories: ['../packages/**/*.stories.{ts,tsx}'],

  addons: [
    '@storybook/addon-docs',
    'storybook-addon-playroom',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
  ],

  async webpackFinal(config) {
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: [/node_modules/],
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            ...createBabelConfig({ docs: true }),
          },
        },

        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {
            tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
          },
        },
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.mainFields = ['module', 'browser', 'main'];

    return config;
  },
};
