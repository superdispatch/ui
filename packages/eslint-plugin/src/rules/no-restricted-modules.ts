import { AST_NODE_TYPES } from '@typescript-eslint/experimental-utils';
import { TSESTree } from '@typescript-eslint/types';

import { createRule } from '../utils/createRule';

const messages = {
  restrict:
    'Usage of `{{restrictedName}}` from `{{restrictedModule}}` is restricted, use `{{suggestedName}}` from the `{{suggestedModule}}`',
} as const;

export type MessageIds = keyof typeof messages;

type Restrictions = {
  readonly [TPackage in string]?: {
    readonly [TModule in string]?: [name: string, source: string];
  };
};

const RESTRICTIONS: Restrictions = {
  '@material-ui/core': {
    Grid: ['Columns', '@superdispatch/ui-lab'],
    Box: ['Box', '@superdispatch/ui-lab'],
    Button: ['Button', '@superdispatch/ui'],
    Snackbar: ['Snackbar', '@superdispatch/ui'],
    SnackbarContent: ['SnackbarContent', '@superdispatch/ui'],
  },
  '@superdispatch/ui': {
    Column: ['Column', '@superdispatch/ui-lab'],
    Columns: ['Columns', '@superdispatch/ui-lab'],
    Stack: ['Stack', '@superdispatch/ui-lab'],
    GridStack: ['Stack', '@superdispatch/ui-lab'],
    Inline: ['Inline', '@superdispatch/ui-lab'],
    InlineGrid: ['Inline', '@superdispatch/ui-lab'],
    DescriptionList: ['Stack', '@superdispatch/ui-lab'],
    DescriptionListItem: ['DescriptionItem', '@superdispatch/ui-lab'],
  },
};

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
        const { value: restrictedModule } = node.source;

        if (typeof restrictedModule != 'string') return;

        const packageRestrictions = RESTRICTIONS[restrictedModule];

        if (!packageRestrictions) return;

        for (const specifier of node.specifiers) {
          if (specifier.type === AST_NODE_TYPES.ImportNamespaceSpecifier) {
            continue;
          }

          const restrictedName =
            specifier.type === AST_NODE_TYPES.ImportDefaultSpecifier
              ? 'default'
              : specifier.imported.name;
          const moduleRestrictions = packageRestrictions[restrictedName];

          if (!moduleRestrictions) continue;

          const [suggestedName, suggestedModule] = moduleRestrictions;

          context.report({
            node: specifier,
            data: {
              restrictedName,
              restrictedModule,
              suggestedName,
              suggestedModule,
            },
            messageId: 'restrict',
          });
        }
      },
    };
  },
});
