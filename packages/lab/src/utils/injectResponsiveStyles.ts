import { SuperDispatchTheme } from '@superdispatch/ui';
import { CSSObject } from 'styled-components';

import { mergeStyles } from './mergeStyles';

function injectStyles(
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
  mobile: CSSObject,
  tablet: CSSObject,
  desktop: CSSObject,
): CSSObject {
  injectStyles(styles, theme.breakpoints.only('xs'), mobile);
  injectStyles(styles, theme.breakpoints.only('sm'), tablet);
  injectStyles(styles, theme.breakpoints.up('lg'), desktop);

  return styles;
}
