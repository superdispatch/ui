'use strict';

module.exports = api => {
  api.cache(true);

  return {
    presets: ['@babel/react', ['@babel/env', { modules: false }], '@babel/typescript'],

    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
    ],
  };
};
