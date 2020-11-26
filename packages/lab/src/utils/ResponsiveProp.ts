import { useDeepEqualMemo } from '@superdispatch/hooks';

export type ResponsivePropPrimitive = boolean | number | string;
export type ResponsivePropTuple<T extends ResponsivePropPrimitive> = readonly [
  mobile: T,
  tablet?: T,
  desktop?: T,
];

export type ResponsiveProp<T extends ResponsivePropPrimitive> =
  | T
  | ResponsivePropTuple<T>;

export function toResponsivePropTuple<T extends ResponsivePropPrimitive>(
  prop: ResponsiveProp<T>,
): ResponsivePropTuple<T> {
  return Array.isArray(prop) ? prop : [prop];
}

export function useResponsivePropTuple<T extends ResponsivePropPrimitive>(
  prop: ResponsiveProp<T>,
): ResponsivePropTuple<T> {
  return useDeepEqualMemo(() => toResponsivePropTuple(prop), [prop]);
}
