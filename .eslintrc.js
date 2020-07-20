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
      parserOptions: {
        project: './tsconfig.json',
      },
      settings: { react: { version: 'detect' } },
      rules: {
        'react/display-name': 'off',
        'eslint-comments/no-use': [
          'error',
          { allow: ['eslint-disable-next-line'] },
        ],

        'react-hooks/exhaustive-deps': [
          'error',
          {
            additionalHooks:
              '^(useMemoWith|usePureMemo|usePromise|useIsomorphicLayoutEffect)$',
          },
        ],

        'import/no-internal-modules': [
          'error',
          {
            allow: [
              '**/packages/*/src/**',
              '**/packages/webpage/internal/**',
              '@testing-library/jest-dom/extend-expect',
              '@material-ui/core/transitions',
              '@material-ui/core/styles/createTypography',
              '@material-ui/core/styles/createBreakpoints',
            ],
          },
        ],

        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: '@material-ui/core',
                importNames: ['makeStyles'],
                message: 'Import from "@material-ui/styles" instead.',
              },
            ],
          },
        ],
      },
    },

    {
      files: [
        '**/{__tests__,__testutils__,jestutils,testutils/src}/**/*.{ts,tsx}',
      ],
      extends: ['plugin:@superdispatch/jest'],
      rules: {
        quotes: 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'import/no-anonymous-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        'testing-library/prefer-screen-queries': 'off',
      },
    },

    {
      files: ['**/*.stories.{ts,tsx}'],
      rules: {
        'import/no-internal-modules': 'off',
        'import/no-anonymous-default-export': 'off',
      },
    },

    {
      files: ['**/packages/webpage/**/**.*'],
      rules: {
        'import/no-internal-modules': 'off',
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
