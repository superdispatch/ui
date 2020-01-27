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
        'react/display-name': 'off',
        '@superdispatch/no-index-file': 'off',
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
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
    {
      files: ['**/packages/__fixtures__/**.*'],
      rules: { 'import/no-anonymous-default-export': 'off' },
    },
  ],
};
