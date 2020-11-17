import { ESLintUtils } from '@typescript-eslint/experimental-utils';

export const createRule = ESLintUtils.RuleCreator(
  (ruleName) => `http://${ruleName}`,
);
