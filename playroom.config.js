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
  components: '@superdispatch/ui-playroom/components.ts',
  frameComponent: '@superdispatch/ui-playroom/FrameComponent.tsx',
  iframeSandbox: 'allow-scripts',

  webpackConfig: () => ({
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
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
              cacheDirectory: true,
              ...createBabelConfig({ docs: true }),
            },
          },
        },
      ],
    },
  }),
};
