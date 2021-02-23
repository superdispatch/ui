import { dequal } from 'dequal';
import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../isomorphic-layout-effect/useIsomorphicLayoutEffect';

export function useDeepEqualValue<T>(value: T): T {
  const ref = useRef(value);
  const isEqual = dequal(value, ref.current);

  useIsomorphicLayoutEffect(() => {
    if (!isEqual) {
      ref.current = value;
    }
  });

  return isEqual ? ref.current : value;
}
