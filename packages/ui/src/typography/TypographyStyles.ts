import { Theme } from '@material-ui/core';
import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';
import {
  TypographyOptions,
  Variant,
} from '@material-ui/core/styles/createTypography';
import { CSSProperties } from '@material-ui/styles';

import { SuperDispatchTheme } from '../theme/ThemeProvider';

export type ThemePlatform = 'desktop' | 'mobile';

const FALLBACK_FONT_FAMILY =
  "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif";

const CONTENT_FONT_FAMILY = `SF Pro Text, ${FALLBACK_FONT_FAMILY}`;
const HEADING_FONT_FAMILY = `SF Pro Display, ${FALLBACK_FONT_FAMILY}`;

function xsOnly(breakpoints: Breakpoints): string {
  return breakpoints.only('xs');
}

export function getTypographyProp(
  theme: Theme,
  platform: ThemePlatform,
  variant: Variant,
  prop: 'fontSize' | 'lineHeight',
): string | undefined {
  let css = theme.typography[variant];

  if (platform === 'mobile') {
    css = css[xsOnly(theme.breakpoints)] as CSSProperties;
  }

  return css?.[prop] as string;
}

export function createTypographyOptions(
  breakpoints: Breakpoints,
): TypographyOptions {
  const xs = breakpoints.only('xs');

  return {
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontFamily: CONTENT_FONT_FAMILY,

    h1: {
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: 700,
      fontFamily: HEADING_FONT_FAMILY,
      [xs]: { fontSize: '34px', lineHeight: '44px' },
    },

    h2: {
      fontSize: '24px',
      lineHeight: '28px',
      fontWeight: 500,
      fontFamily: HEADING_FONT_FAMILY,
      [xs]: { fontSize: '26px', lineHeight: '32px' },
    },

    h3: {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 500,
      fontFamily: HEADING_FONT_FAMILY,
      [xs]: { fontSize: '22px', lineHeight: '32px' },
    },

    h4: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 500,
      [xs]: { fontSize: '18px', lineHeight: '28px' },
    },

    h5: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 600,
      [xs]: { fontSize: '16px', lineHeight: '24px' },
    },

    h6: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      [xs]: { fontSize: '14px', lineHeight: '20px' },
    },

    body1: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 600,
      [xs]: { fontSize: '16px', lineHeight: '24px' },
    },

    body2: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
      [xs]: { fontSize: '16px', lineHeight: '24px' },
    },

    caption: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
      [xs]: { fontSize: '14px', lineHeight: '20px' },
    },

    button: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 600,
      textTransform: undefined,
      [xs]: { fontSize: '16px', lineHeight: '24px' },
    },
  };
}

export function applyTypographyStyles(theme: SuperDispatchTheme) {
  theme.props.MuiTypography = { variant: 'body2' };
}
