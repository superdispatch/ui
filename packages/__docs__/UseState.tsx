import { renderChildren } from '@superdispatch/ui';
import { Dispatch, ReactElement, SetStateAction, useState } from 'react';

export interface UseStateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: any;
  children: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setState: Dispatch<SetStateAction<any>>,
  ) => null | ReactElement;
}

export function UseState({ children, initialState }: UseStateProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [state, setState] = useState(initialState);

  return renderChildren(children(state, setState));
}
