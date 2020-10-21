import { useCallback, useLayoutEffect, useRef } from 'react';

export function useIsMounted(): () => boolean {
  const ref = useRef(false);

  useLayoutEffect(() => {
    ref.current = true;

    return () => {
      ref.current = false;
    };
  }, []);

  return useCallback(() => ref.current, []);
}
