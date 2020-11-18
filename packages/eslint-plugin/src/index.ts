import { rule as noColorLiterals } from './rules/no-color-literals';
import { rule as noRestrictedModules } from './rules/no-restricted-modules';

export const rules = {
  'no-color-literals': noColorLiterals,
  'no-restricted-modules': noRestrictedModules,
} as const;

export const configs = {
  recommended: {
    plugins: ['@superdispatch/ui'],

    rules: {
      '@superdispatch/ui/no-color-literals': ['error'],
      '@superdispatch/ui/no-restricted-modules': ['error'],
    },
  },
} as const;
