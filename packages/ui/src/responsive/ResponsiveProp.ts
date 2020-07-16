import { useResponsiveValue } from './ResponsiveValue';

export interface ResponsivePropInit<T> {
  xs: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

export type ResponsivePropPrimitive = boolean | number | string;
export type ResponsiveProp<T extends ResponsivePropPrimitive> =
  | T
  | ResponsivePropInit<T>;

function normalizeResponsiveProp<T extends ResponsivePropPrimitive>(
  prop: ResponsiveProp<T>,
): ResponsivePropInit<T> {
  if (typeof prop !== 'object') {
    prop = { xs: prop };
  }

  return prop;
}

export function useResponsiveProp<T extends ResponsivePropPrimitive>(
  prop: ResponsiveProp<T>,
): T {
  const { xs, sm = xs, md, lg, xl } = normalizeResponsiveProp<T>(prop);

  return useResponsiveValue(xs, sm, md, lg, xl);
}
