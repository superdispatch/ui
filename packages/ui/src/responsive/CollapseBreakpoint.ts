import type { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { useResponsiveContext } from './ResponsiveContext';

export type CollapseBreakpoint = 'sm' | 'md' | 'lg' | 'xl';

const BREAKPOINTS: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export function useCollapseBreakpoint(
  collapseBreakpoint: undefined | CollapseBreakpoint,
): boolean {
  const { breakpoint = 'xs' } = useResponsiveContext();

  if (collapseBreakpoint == null) {
    return false;
  }

  const breakpointIDX = BREAKPOINTS.indexOf(breakpoint);
  const collapseBreakpointIDX = BREAKPOINTS.indexOf(collapseBreakpoint);

  return breakpointIDX < collapseBreakpointIDX;
}
