import { useCallback, useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../isomorphic-layout-effect/useIsomorphicLayoutEffect';

export function useIsMounted(): () => boolean {
  const ref = useRef(false);

  useIsomorphicLayoutEffect(() => {
    ref.current = true;

    return () => {
      ref.current = false;
    };
  }, []);

  return useCallback(() => ref.current, []);
}
