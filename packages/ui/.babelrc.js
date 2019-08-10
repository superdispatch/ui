'use strict';

module.exports = {
  presets: ['@babel/react'],
  plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
};
