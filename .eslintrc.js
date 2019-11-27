'use strict';

module.exports = {
  overrides: [
    { files: '*.js', extends: 'plugin:@superdispatch/node' },
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@superdispatch/react',
        'plugin:@superdispatch/typescript',
      ],
      settings: { react: { version: 'detect' } },
    },

    {
      files: ['**/fixtures/**.*'],
      rules: { 'import/no-anonymous-default-export': 'off' },
    },
  ],
};
