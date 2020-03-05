'use strict';

module.exports = {
  stories: ['../**/*.stories.ts'],
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

    return config;
  },
};
