import { useResponsiveValue } from './ResponsiveValue';

export interface ResponsivePropInit<T> {
  xs: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

export type ResponsiveProp<T extends number | string> =
  | T
  | ResponsivePropInit<T>;

function normalizeResponsiveProp<T extends number | string>(
  prop: ResponsiveProp<T>,
): ResponsivePropInit<T> {
  if (typeof prop !== 'object') {
    prop = { xs: prop };
  }

  return prop;
}

export function useResponsiveProp<T extends string | number>(
  prop: ResponsiveProp<T>,
): T {
  const { xs, sm = xs, md, lg, xl } = normalizeResponsiveProp<T>(prop);

  return useResponsiveValue(xs, sm, md, lg, xl);
}
