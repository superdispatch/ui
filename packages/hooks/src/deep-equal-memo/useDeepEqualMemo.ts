import { dequal } from 'dequal';
import { DependencyList, useEffect, useRef } from 'react';

interface State<T> {
  value: T;
}

export function useDeepEqualMemo<T>(
  factory: (prevValue: T | undefined) => T,
  deps: DependencyList,
): T {
  const depsRef = useRef(deps);
  const stateRef = useRef<State<T>>();

  let nextState: undefined | State<T> = undefined;

  if (stateRef.current == null) {
    stateRef.current = { value: factory(undefined) };
  } else if (!dequal(depsRef.current, deps)) {
    const nextValue = factory(stateRef.current.value);

    if (!dequal(nextValue, stateRef.current.value)) {
      nextState = { value: nextValue };
    }
  }

  useEffect(() => {
    depsRef.current = deps;

    if (nextState) {
      stateRef.current = nextState;
    }
  });

  return nextState != null ? nextState.value : stateRef.current.value;
}
