import { AST_NODE_TYPES } from '@typescript-eslint/experimental-utils';
import { TSESTree } from '@typescript-eslint/types';

import { createRule } from '../utils/createRule';

const messages = {
  forbid:
    'Usage of `{{name}}` is restricted, use alternative from the `@superdispatch/ui`',
} as const;

export type MessageIds = keyof typeof messages;

const RESTRICTED_MODULES: ReadonlySet<string> = new Set([
  'Box',
  'Button',
  'Snackbar',
]);

export const rule = createRule<[], MessageIds>({
  name: 'no-restricted-modules',
  defaultOptions: [],
  meta: {
    messages,
    type: 'problem',
    fixable: 'code',
    docs: {
      recommended: 'error',
      category: 'Possible Errors',
      description: 'Disallows to use Material UI modules',
    },
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration): void {
        if (node.source.value !== '@material-ui/core') return;

        for (const specifier of node.specifiers) {
          if (specifier.type !== AST_NODE_TYPES.ImportSpecifier) continue;

          const { name } = specifier.imported;

          if (!RESTRICTED_MODULES.has(name)) continue;

          context.report({
            node: specifier,
            data: { name },
            messageId: 'forbid',
          });
        }
      },
    };
  },
});
