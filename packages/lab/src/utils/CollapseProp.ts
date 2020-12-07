import { ResponsivePropTuple } from '@superdispatch/ui';

export type CollapseProp = 'tablet' | 'desktop';

export function isCollapsedBelow(
  collapsedBelow: undefined | CollapseProp,
): ResponsivePropTuple<boolean> {
  return [collapsedBelow != null, collapsedBelow === 'desktop', false];
}
