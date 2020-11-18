import { Color } from '@superdispatch/ui';
import { TSESTree } from '@typescript-eslint/types';

import { createRule } from '../utils/createRule';

//
// Utils
//

function normalizeHex(hex: string): string {
  hex = hex.toLowerCase();

  // #ffffff -> #fff
  if (new Set(hex).size === 2) {
    hex = hex.charAt(0) + hex.charAt(1).repeat(3);
  }

  return hex;
}

const COLOR_KEY_CACHE = new Map<string, string>();
function findColorName(color: string): undefined | string {
  if (COLOR_KEY_CACHE.size === 0) {
    for (const [key, hex] of Object.entries(Color)) {
      COLOR_KEY_CACHE.set(normalizeHex(hex), key);
    }
  }

  return COLOR_KEY_CACHE.get(color);
}

const HEX_COLOR_PATTERN = /(#\b([a-f0-9]{3}|[a-f0-9]{6})\b)/gim;
function* listColorNames(text: string): Generator<string, void> {
  for (const [, hex] of text.matchAll(HEX_COLOR_PATTERN)) {
    const color = normalizeHex(hex);
    const name = findColorName(color);

    if (name) {
      yield name;
    }
  }
}

//
// Rule
//

const messages = {
  suggestColor: 'Use `Color.{{name}}` from "@superdispatch/ui"',
} as const;

export type MessageIds = keyof typeof messages;

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
      Literal(node: TSESTree.Literal): void {
        if (typeof node.value == 'string') {
          for (const name of listColorNames(node.value)) {
            context.report({
              node,
              data: { name },
              messageId: 'suggestColor',
            });
          }
        }
      },

      TemplateLiteral(node: TSESTree.TemplateLiteral): void {
        for (const quasi of node.quasis) {
          for (const name of listColorNames(quasi.value.raw)) {
            context.report({
              node,
              data: { name },
              messageId: 'suggestColor',
            });
          }
        }
      },
    };
  },
});
