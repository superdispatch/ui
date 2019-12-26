'use strict';

module.exports = {
  overrides: [
    { files: '*.js', extends: 'plugin:@superdispatch/node' },
    {
      files: '*.{ts,tsx}',
      extends: [
        'plugin:@superdispatch/react',
        'plugin:@superdispatch/typescript',
      ],
      settings: { react: { version: 'detect' } },
      rules: {
        'react-hooks/exhaustive-deps': [
          'error',
          {
            additionalHooks: '^(useMemoWith|usePromise)$',
          },
        ],
      },
    },
    {
      files: '**/{__tests__,__testutils__}/*.{ts,tsx}',
      extends: ['plugin:@superdispatch/jest'],
      rules: {
        quotes: 'off',
        'react/display-name': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['**/fixtures/**.*'],
      rules: { 'import/no-anonymous-default-export': 'off' },
    },
  ],
};
