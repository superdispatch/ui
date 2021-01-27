'use strict';

const createBabelConfig = require('../config/createBabelConfig');

module.exports = {
  stories: ['../packages/**/*.stories.{ts,tsx}'],
  addons: ['@storybook/addon-essentials', 'storybook-addon-playroom'],

  webpackFinal(config) {
    const babelConfig = createBabelConfig({ docs: true });
    config.module.rules[0].use[0].options.plugins.push(...babelConfig.plugins);
    config.resolve.mainFields = ['module', 'browser', 'main'];

    return config;
  },
};
