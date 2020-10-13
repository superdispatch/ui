'use strict';

module.exports = {
  overrides: [
    {
      files: '*.js',
      extends: 'plugin:@superdispatch/node',
    },

    {
      files: '*.{ts,tsx}',
      extends: [
        'plugin:@superdispatch/react',
        'plugin:@superdispatch/typescript',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },

      settings: {
        react: {
          version: 'detect',
        },
      },

      rules: {
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

        'react/display-name': 'off',

        'react-hooks/exhaustive-deps': [
          'error',
          {
            additionalHooks:
              '^(useMemoWith|usePureMemo|usePromise|useIsomorphicLayoutEffect)$',
          },
        ],

        'eslint-comments/no-use': [
          'error',
          { allow: ['eslint-disable-next-line'] },
        ],

        'import/no-cycle': 'error',

        'import/no-internal-modules': [
          'error',
          {
            allow: [
              '**/packages/*/src/**',
              '**/packages/webpage/internal/**',
              '@material-ui/core/transitions',
              '@material-ui/core/styles/createTypography',
              '@material-ui/core/styles/createBreakpoints',
            ],
          },
        ],
      },
    },

    {
      files: [
        '**/jestutils/**/*.{ts,tsx}',
        '**/testutils/**/*.{ts,tsx}',
        '**/__tests__/**/*.{ts,tsx}',
        '**/__testutils__/**/*.{ts,tsx}',
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
      files: ['**/packages/__docs__/**/**.*'],
      rules: { 'import/no-internal-modules': 'off' },
    },

    {
      files: ['**/*.stories.{ts,tsx}'],
      rules: {
        'no-alert': 'off',
        'import/no-internal-modules': 'off',
        'import/no-anonymous-default-export': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
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
