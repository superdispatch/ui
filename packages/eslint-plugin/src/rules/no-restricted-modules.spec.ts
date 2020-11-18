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
          messageId: 'forbid',
          data: { name: 'Box' },
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
          messageId: 'forbid',
          data: { name: 'Box' },
        },
      ],
    },
  ],
});
