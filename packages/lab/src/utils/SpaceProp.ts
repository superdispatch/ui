import { createRuleNormalizer } from './RuleNormalizer';

export type SpaceProp =
  | 'none'
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge';

export const normalizeSpace = createRuleNormalizer<SpaceProp>({
  none: 0,
  xxsmall: 4,
  xsmall: 8,
  small: 16,
  medium: 24,
  large: 32,
  xlarge: 40,
  xxlarge: 48,
});
