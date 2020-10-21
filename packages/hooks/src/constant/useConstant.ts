import { MutableRefObject, useRef } from 'react';

export function useConstant<T>(factory: () => T): T {
  const ref = useRef<null | MutableRefObject<T>>(null);

  if (ref.current == null) {
    ref.current = { current: factory() };
  }

  return ref.current.current;
}
