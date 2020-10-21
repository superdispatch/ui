import { useLayoutEffect, useRef } from 'react';

export type EventHandler<T> = (event: T) => void;

export function useEventHandler<T>(
  handler: null | undefined | EventHandler<T>,
): EventHandler<T> {
  const mountRef = useRef(false);
  const callbackRef = useRef(handler);

  const { current: wrapper } = useRef<EventHandler<T>>((event) => {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production') {
      if (!mountRef.current) {
        // eslint-disable-next-line no-console
        console.error(
          '[useEventHandler]: "handler" was called during the render. ' +
            'This can lead to stale closure problems.',
        );
      }
    }

    callbackRef.current?.(event);
  });

  useLayoutEffect(() => {
    mountRef.current = true;
    callbackRef.current = handler;

    return () => {
      mountRef.current = false;
    };
  });

  return wrapper;
}
