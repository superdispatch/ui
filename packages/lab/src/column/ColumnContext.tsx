import { useDeepEqualValue } from '@superdispatch/hooks';
import { VerticalAlign } from '@superdispatch/ui';
import { createContext, ReactElement, ReactNode, useContext } from 'react';

import { CollapseProp } from '../utils/CollapseProp';
import {
  ResponsivePropTuple,
  toResponsivePropTuple,
} from '../utils/ResponsiveProp';
import { SpaceProp } from '../utils/SpaceProp';

export interface ColumnsContext {
  collapseBelow: undefined | CollapseProp;
  align: ResponsivePropTuple<VerticalAlign>;
  space: ResponsivePropTuple<SpaceProp>;
  reverse: ResponsivePropTuple<boolean>;
}

const Context = createContext<ColumnsContext>({
  align: toResponsivePropTuple('top'),
  space: toResponsivePropTuple('none'),
  reverse: toResponsivePropTuple(false),
  collapseBelow: undefined,
});

export function useColumnsContext(): ColumnsContext {
  return useContext(Context);
}

export interface ColumnsContextProviderProps extends ColumnsContext {
  children?: ReactNode;
}

export function ColumnsContextProvider({
  children,
  ...props
}: ColumnsContextProviderProps): ReactElement {
  const ctx = useDeepEqualValue<ColumnsContext>(props);

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
