'use strict';

const path = require('path');
const createBabelConfig = require('./config/createBabelConfig');

module.exports = {
  port: 9000,
  openBrowser: false,
  title: 'Super Dispatch UI',
  widths: [320, 768, 1024],
  exampleCode: `
    <Button>
      Hello
    </Button>
  `,

  baseUrl: '/playroom/',
  outputPath: './docs/playroom',
  components: './packages/__docs__/generated/components.ts',
  frameComponent: './packages/__docs__/FrameComponent.tsx',
  iframeSandbox: 'allow-scripts',

  webpackConfig: () => ({
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      mainFields: ['module', 'browser', 'main'],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          include: path.join(__dirname, 'packages'),
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              cacheDirectory: true,
              ...createBabelConfig({ docs: true }),
            },
          },
        },
      ],
    },
  }),
};
