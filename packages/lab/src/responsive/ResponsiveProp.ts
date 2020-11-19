export type ResponsivePropPrimitive = boolean | number | string;
export type ResponsivePropTuple<T extends ResponsivePropPrimitive> = [
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
  if (Array.isArray(prop)) {
    return prop;
  }

  return [prop];
}
