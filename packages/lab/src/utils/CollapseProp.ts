export type CollapseProp = 'tablet' | 'desktop';

export function isCollapsedBreakpoint(
  prop: undefined | CollapseProp,
  breakpoint: 'xs' | 'sm' | 'lg',
): boolean {
  switch (breakpoint) {
    case 'xs':
      return prop === 'tablet' || prop === 'desktop';

    case 'sm':
      return prop === 'tablet';
  }

  return false;
}
