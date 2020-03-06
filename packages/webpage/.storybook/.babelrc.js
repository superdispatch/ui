'use strict';

module.exports = {
  plugins: [require.resolve('./babel-plugin-csb')],
  presets: [['@superdispatch/babel-preset', { targets: 'esmodules' }]],
};
