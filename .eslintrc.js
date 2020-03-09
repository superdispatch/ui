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
            additionalHooks:
              '^(useMemoWith|usePureMemo|usePromise|useIsomorphicLayoutEffect)$',
          },
        ],
      },
    },
    {
      files: [
        'setupTestGlobals.ts',
        '**/{__tests__,__testutils__,testutils/src}/**/*.{ts,tsx}',
      ],
      extends: ['plugin:@superdispatch/jest'],
      rules: {
        quotes: 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'import/no-anonymous-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['**/packages/webpage/**.*'],
      rules: { 'import/no-anonymous-default-export': 'off' },
    },
  ],
};
