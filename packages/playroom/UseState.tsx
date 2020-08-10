import { Dispatch, ReactElement, SetStateAction, useState } from 'react';

export interface UseStateProps<T> {
  initialState: T | (() => T);
  render: (
    state: T,
    setState: Dispatch<SetStateAction<T>>,
  ) => null | ReactElement;
}

export function UseState<T>({ render, initialState }: UseStateProps<T>) {
  const [state, setState] = useState<T>(initialState);

  return render(state, setState);
}
