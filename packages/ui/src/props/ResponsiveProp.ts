import { useDeepEqualValue } from '@superdispatch/hooks';
import { useResponsiveContext } from '../responsive/ResponsiveContext';

export type ResponsivePropPrimitive = boolean | number | string;

export type ResponsivePropTupleInit<T extends ResponsivePropPrimitive> =
  readonly [mobile: T, tablet?: T, desktop?: T];
export type ResponsiveProp<T extends ResponsivePropPrimitive> =
  | T
  | ResponsivePropTupleInit<T>;

export type ResponsivePropTuple<T extends ResponsivePropPrimitive> = readonly [
  mobile: T,
  tablet: T,
  desktop: T,
];

export function parseResponsiveProp<T extends ResponsivePropPrimitive>(
  prop: ResponsiveProp<T>,
): ResponsivePropTuple<T> {
  if (typeof prop != 'object') return [prop, prop, prop];
  let [mobile, tablet, desktop] = prop;

  tablet ??= mobile;
  desktop ??= tablet;

  return [mobile, tablet, desktop];
}

export function useResponsiveProp<T extends ResponsivePropPrimitive>(
  prop: ResponsiveProp<T>,
): ResponsivePropTuple<T> {
  return useDeepEqualValue(parseResponsiveProp(prop));
}

export interface PartialResponsivePropRecord<T> {
  xs: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

export type ResponsivePropRecord<T extends ResponsivePropPrimitive> =
  | T
  | PartialResponsivePropRecord<T>;

export function useResponsiveValue<T>(
  xs: T,
  sm: T,
  md = sm,
  lg = md,
  xl = lg,
): T {
  const { breakpoint = 'xs' } = useResponsiveContext();
  return { xs, sm, md, lg, xl }[breakpoint];
}

export function useResponsivePropRecord<T extends ResponsivePropPrimitive>(
  prop: ResponsivePropRecord<T>,
): T {
  if (typeof prop != 'object') prop = { xs: prop };
  const { xs, sm, md, lg, xl } = prop;
  return useResponsiveValue(xs, sm ?? xs, md, lg, xl);
}
