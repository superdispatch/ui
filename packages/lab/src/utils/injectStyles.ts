import { SuperDispatchTheme } from '@superdispatch/ui';
import { CSSObject } from 'styled-components';

import { mergeStyles } from './mergeStyles';

export function injectStyles(
  styles: CSSObject,
  breakpoint: string,
  rules: undefined | CSSObject,
): CSSObject {
  if (rules != null) {
    const currentRules = styles[breakpoint];

    if (typeof currentRules == 'object') {
      mergeStyles(currentRules, rules);
    } else {
      styles[breakpoint] = rules;
    }
  }

  return styles;
}

export function injectResponsiveStyles(
  styles: CSSObject,
  theme: SuperDispatchTheme,
  mobile: undefined | CSSObject,
  tablet: undefined | CSSObject,
  desktop: undefined | CSSObject,
): CSSObject {
  injectStyles(styles, theme.breakpoints.up('xs'), mobile);
  injectStyles(styles, theme.breakpoints.up('sm'), tablet);
  injectStyles(styles, theme.breakpoints.up('lg'), desktop);

  return styles;
}
