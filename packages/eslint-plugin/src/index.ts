import { rule as noRestrictedModules } from './rules/no-restricted-modules';

export const rules = {
  'no-restricted-modules': noRestrictedModules,
} as const;

export const configs = {
  recommended: {
    plugins: ['@superdispatch/ui'],

    rules: {
      '@superdispatch/ui/no-restricted-modules': ['error'],
    },
  },
} as const;
