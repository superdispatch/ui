import { SuperDispatchTheme } from '@superdispatch/ui';
import { CSSObject } from 'styled-components';

import { mergeStyles } from './mergeStyles';

export function injectStyles(
  styles: CSSObject,
  breakpoint: string,
  rules: undefined | CSSObject,
): void {
  if (rules == null) return;

  const currentRules = styles[breakpoint];

  if (typeof currentRules != 'object') {
    styles[breakpoint] = rules;
  } else {
    mergeStyles(currentRules, rules);
  }
}

export function injectResponsiveStyles(
  theme: SuperDispatchTheme,
  styles: CSSObject,
  mobile: undefined | CSSObject,
  tablet: undefined | CSSObject,
  desktop: undefined | CSSObject,
): void {
  injectStyles(styles, theme.breakpoints.up('xs'), mobile);
  injectStyles(styles, theme.breakpoints.up('sm'), tablet);
  injectStyles(styles, theme.breakpoints.up('lg'), desktop);
}
