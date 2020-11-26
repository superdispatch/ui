import { useDeepEqualMemo } from '@superdispatch/hooks';

export type ResponsivePropPrimitive = boolean | number | string;
export type ResponsivePropTuple<T extends ResponsivePropPrimitive> = readonly [
  mobile: T,
  tablet: T,
  desktop: T,
];

export type ResponsiveProp<T extends ResponsivePropPrimitive> =
  | T
  | readonly [mobile: T, tablet?: T, desktop?: T];

export function toResponsivePropTuple<T extends ResponsivePropPrimitive>(
  prop: ResponsiveProp<T>,
): ResponsivePropTuple<T> {
  if (!Array.isArray(prop)) {
    return [prop, prop, prop];
  }

  const [mobile, tablet = mobile, desktop = tablet] = prop;

  return [mobile, tablet, desktop];
}

export function useResponsivePropTuple<T extends ResponsivePropPrimitive>(
  prop: ResponsiveProp<T>,
): ResponsivePropTuple<T> {
  return useDeepEqualMemo(() => toResponsivePropTuple(prop), [prop]);
}
