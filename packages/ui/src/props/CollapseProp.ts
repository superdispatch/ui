import { ResponsivePropTuple } from './ResponsiveProp';

export type CollapseProp = 'tablet' | 'desktop';

export function parseCollapsedBelow(
  collapsedBelow: undefined | CollapseProp,
): ResponsivePropTuple<boolean> {
  return [
    collapsedBelow === 'tablet' || collapsedBelow === 'desktop',
    collapsedBelow === 'desktop',
    false,
  ];
}
