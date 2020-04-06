import { RefObject, useLayoutEffect, useRef } from 'react';

export function useIsMounted(): RefObject<boolean> {
  const ref = useRef(false);

  useLayoutEffect(() => {
    ref.current = true;

    return () => {
      ref.current = false;
    };
  }, []);

  return ref;
}
