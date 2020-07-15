import { useResponsiveContext } from './ResponsiveContext';

export function useResponsiveValue<T>(
  xs: T,
  sm = xs,
  md = sm,
  lg = md,
  xl = lg,
): T {
  const { breakpoint } = useResponsiveContext();

  return breakpoint === 'xl'
    ? xl
    : breakpoint === 'lg'
    ? lg
    : breakpoint === 'md'
    ? md
    : breakpoint === 'sm'
    ? sm
    : xs;
}
