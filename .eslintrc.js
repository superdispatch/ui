'use strict';

module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },

  rules: {
    'func-style': ['error', 'declaration'],
  },

  overrides: [
    {
      files: '.eslintrc.js',
      plugins: ['eslint-config'],
      rules: {
        'eslint-config/sort-rules': 'error',
      },
    },

    {
      files: '*.js',
      extends: 'plugin:@superdispatch/node',
    },

    {
      files: ['types/*.d.ts', 'packages/**/*.{ts,tsx}'],
      excludedFiles: [
        'packages/jestutils/**/*.ts',
        'packages/testutils/**/*.ts',
        'packages/eslint-plugin/**/*.ts',
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
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          { allowExpressions: true },
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
              'react-dom/test-utils',
              '@material-ui/core/transitions',
              '@material-ui/core/styles/createTypography',
              '@material-ui/core/styles/createBreakpoints',
            ],
          },
        ],

        'react-hooks/exhaustive-deps': [
          'error',
          {
            additionalHooks: '^(useDeepEqualMemo)$',
          },
        ],

        'react/display-name': 'off',
        'react/react-in-jsx-scope': 'off',

        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: '@material-ui/core',
                importNames: ['makeStyles'],
                message: 'Import from "@material-ui/styles" instead.',
              },

              {
                name: '@material-ui/core',
                importNames: ['Box'],
                message:
                  'Use alternative from the "@superdispatch/ui-lab" instead.',
              },
            ],
          },
        ],
      },
    },

    {
      files: ['scripts/**/*.ts', 'packages/eslint-plugin/**/*.ts'],
      extends: ['plugin:@superdispatch/ts-node'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            peerDependencies: true,
          },
        ],
      },
    },

    {
      files: [
        'setupTests.ts',
        'globalSetup.ts',
        'packages/jestutils/**/*.ts',
        'packages/testutils/**/*.ts',

        '**/*.spec.{ts,tsx}',
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
      parserOptions: {
        project: './cypress/tsconfig.json',
      },
      files: ['cypress/**/*.{ts,tsx}'],
      extends: ['plugin:@superdispatch/ts-cypress'],
      rules: {
        '@typescript-eslint/no-namespace': 'off',
        'cypress/no-unnecessary-waiting': 'off',
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
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        'import/no-anonymous-default-export': 'off',
        'import/no-internal-modules': 'off',
        'func-style': ['error', 'expression'],
        'no-alert': 'off',
      },
    },
  ],
};
