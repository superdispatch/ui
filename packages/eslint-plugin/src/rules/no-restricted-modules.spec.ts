import { ESLintUtils } from '@typescript-eslint/experimental-utils';

import { rule } from './no-restricted-modules';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-restricted-modules', rule, {
  valid: ['import { Box } from "styled-system"'],
  invalid: [
    {
      code: 'import { Box } from "@material-ui/core"',
      errors: [
        {
          line: 1,
          endLine: 1,
          column: 10,
          endColumn: 13,
          messageId: 'restrict',
          data: {
            restrictedName: 'Box',
            restrictedModule: '@material-ui/core',
            suggestedName: 'Box',
            suggestedModule: '@superdispatch/ui-lab',
          },
        },
      ],
    },

    {
      code: 'import { Box as div } from "@material-ui/core"',
      errors: [
        {
          line: 1,
          endLine: 1,
          column: 10,
          endColumn: 20,
          messageId: 'restrict',
          data: {
            restrictedName: 'Box',
            restrictedModule: '@material-ui/core',
            suggestedName: 'Box',
            suggestedModule: '@superdispatch/ui-lab',
          },
        },
      ],
    },

    {
      code:
        'import { Avatar, Button, Card, Grid, Snackbar, SnackbarContent } from "@material-ui/core"',
      errors: [
        {
          messageId: 'restrict',
          data: {
            restrictedName: 'Button',
            restrictedModule: '@material-ui/core',
            suggestedName: 'Button',
            suggestedModule: '@superdispatch/ui',
          },
        },

        {
          messageId: 'restrict',
          data: {
            restrictedName: 'Grid',
            restrictedModule: '@material-ui/core',
            suggestedName: 'Columns',
            suggestedModule: '@superdispatch/ui-lab',
          },
        },

        {
          messageId: 'restrict',
          data: {
            restrictedName: 'Snackbar',
            restrictedModule: '@material-ui/core',
            suggestedName: 'Snackbar',
            suggestedModule: '@superdispatch/ui',
          },
        },

        {
          messageId: 'restrict',
          data: {
            restrictedName: 'SnackbarContent',
            restrictedModule: '@material-ui/core',
            suggestedName: 'SnackbarContent',
            suggestedModule: '@superdispatch/ui',
          },
        },
      ],
    },

    {
      code: 'import styled, { css } from "styled-components"',
      errors: [
        {
          messageId: 'restrict',
          data: {
            restrictedName: 'default',
            restrictedModule: 'styled-components',
            suggestedName: 'styled',
            suggestedModule: '@superdispatch/ui-lab',
          },
        },
        {
          messageId: 'restrict',
          data: {
            restrictedName: 'css',
            restrictedModule: 'styled-components',
            suggestedName: 'css',
            suggestedModule: '@superdispatch/ui-lab',
          },
        },
      ],
    },
  ],
});
