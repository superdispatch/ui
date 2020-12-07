export type SpaceProp =
  | 'none'
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge';

export function parseSpaceProp(prop: SpaceProp): number {
  switch (prop) {
    case 'none':
    default:
      return 0;
    case 'xxsmall':
      return 4;
    case 'xsmall':
      return 8;
    case 'small':
      return 16;
    case 'medium':
      return 24;
    case 'large':
      return 32;
    case 'xlarge':
      return 40;
    case 'xxlarge':
      return 48;
  }
}
