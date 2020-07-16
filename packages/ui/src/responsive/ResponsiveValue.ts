import { useResponsiveContext } from './ResponsiveContext';

export function useResponsiveValue<T>(
  xs: T,
  sm: T,
  md = sm,
  lg = md,
  xl = lg,
): T {
  const values = { xs, sm, md, lg, xl };
  const { breakpoint = 'xs' } = useResponsiveContext();

  return values[breakpoint];
}
