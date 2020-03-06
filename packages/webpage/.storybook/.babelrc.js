'use strict';

module.exports = {
  plugins: [require.resolve('./babel-plugin-deploy-info')],
  presets: [['@superdispatch/babel-preset', { targets: 'esmodules' }]],
};
