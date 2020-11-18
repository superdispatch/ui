'use strict';

module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },

  overrides: [
    {
      files: '*.js',
      extends: 'plugin:@superdispatch/node',
    },

    {
      files: [
        '**/packages/__docs__/**/*.{ts,tsx}',
        '**/packages/dates/**/*.{ts,tsx}',
        '**/packages/forms/**/*.{ts,tsx}',
        '**/packages/hooks/**/*.{ts,tsx}',
        '**/packages/phones/**/*.{ts,tsx}',
        '**/packages/ui/**/*.{ts,tsx}',
      ],
      extends: [
        'plugin:@superdispatch/react',
        'plugin:@superdispatch/typescript',
      ],

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
                name: 'dequal',
                message: 'Use "dequal/lite" instead.',
              },

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
              'dequal/lite',
              '@material-ui/core/transitions',
              '@material-ui/core/styles/createTypography',
              '@material-ui/core/styles/createBreakpoints',
            ],
          },
        ],
      },
    },

    {
      files: ['**/packages/eslint-plugin/**/*.ts'],
      extends: ['plugin:@superdispatch/ts-node'],
    },

    {
      files: [
        '**/setupTests.ts',
        '**/globalSetup.ts',
        '**/*.spec.{ts,tsx}',
        '**/jestutils/**/*.ts',
        '**/testutils/**/*.ts',
        '**/__tests__/**/*.{ts,tsx}',
        '**/__testutils__/**/*.{ts,tsx}',
      ],
      extends: ['plugin:@superdispatch/ts-jest'],
      rules: {
        '@typescript-eslint/no-namespace': 'off',
        'import/no-anonymous-default-export': 'off',
      },
    },

    {
      files: ['**/packages/__docs__/**/**.*'],
      rules: {
        'import/no-internal-modules': 'off',
      },
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
  ],
};
