import { dequal } from 'dequal';
import { useLayoutEffect, useRef } from 'react';

export function useDeepEqualValue<T>(value: T): T {
  const ref = useRef(value);
  const isEqual = dequal(value, ref.current);

  useLayoutEffect(() => {
    if (!isEqual) {
      ref.current = value;
    }
  });

  return isEqual ? ref.current : value;
}
