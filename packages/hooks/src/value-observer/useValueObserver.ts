import { useEffect, useRef } from 'react';

export function useValueObserver<T>(
  value: T,
  observer: (prev: T) => void,
): void {
  const ref = useRef(value);

  useEffect(() => {
    if (!Object.is(value, ref.current)) {
      observer(ref.current);
      ref.current = value;
    }
  });
}
