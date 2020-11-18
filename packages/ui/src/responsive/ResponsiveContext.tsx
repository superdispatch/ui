import { useMediaQuery } from '@material-ui/core';
import type { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from 'react';

import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

export interface ResponsiveContext {
  breakpoint?: Breakpoint;
}

const Context = createContext<ResponsiveContext>({});

function useBreakpoint(breakpoint: Breakpoint): boolean {
  return useMediaQuery<SuperDispatchTheme>((theme) =>
    theme.breakpoints.only(breakpoint),
  );
}

export interface ResponsiveContextProviderProps {
  children?: ReactNode;
  defaultBreakpoint?: Breakpoint;
}

export function ResponsiveContextProvider({
  children,
  defaultBreakpoint,
}: ResponsiveContextProviderProps): ReactElement {
  const isXS = useBreakpoint('xs');
  const isSM = useBreakpoint('sm');
  const isMD = useBreakpoint('md');
  const isLG = useBreakpoint('lg');
  const isXL = useBreakpoint('xl');
  const breakpoint: undefined | Breakpoint = isXS
    ? 'xs'
    : isSM
    ? 'sm'
    : isMD
    ? 'md'
    : isLG
    ? 'lg'
    : isXL
    ? 'xl'
    : defaultBreakpoint;

  const ctx = useMemo<ResponsiveContext>(() => ({ breakpoint }), [breakpoint]);

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}

export function useResponsiveContext(): ResponsiveContext {
  return useContext(Context);
}
