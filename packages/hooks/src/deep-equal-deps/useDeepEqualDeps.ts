import { DependencyList, useRef } from 'react';

import { useDeepEqualValue } from '../deep-equal-value/useDeepEqualValue';

export function useDeepEqualDeps(deps: DependencyList): DependencyList {
  const { current: initialDeps } = useRef(deps);

  if (process.env.NODE_ENV !== 'production') {
    if (initialDeps.length !== deps.length) {
      // eslint-disable-next-line no-console
      console.error(
        '[useDeepEqualDeps] size of the "deps" argument has changed between renders. ' +
          'The order and size of this array must remain constant.',
      );
    } else if (initialDeps.length === 0) {
      // eslint-disable-next-line no-console
      console.error('[useDeepEqualDeps] "deps" argument should not be empty.');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return useDeepEqualValue(deps);
}
