import { DependencyList, useMemo } from 'react';

import { useDeepEqualDeps } from '../deep-equal-deps/useDeepEqualDeps';
import { useDeepEqualValue } from '../deep-equal-value/useDeepEqualValue';

export function useDeepEqualMemo<T>(factory: () => T, deps: DependencyList): T {
  const pureDeps = useDeepEqualDeps(deps);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(factory, pureDeps);

  return useDeepEqualValue(value);
}
