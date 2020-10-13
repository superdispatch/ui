import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';

import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

const FALLBACK_FONT_FAMILY =
  "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif";

const CONTENT_FONT_FAMILY = `SF Pro Text, ${FALLBACK_FONT_FAMILY}`;
const HEADING_FONT_FAMILY = `SF Pro Display, ${FALLBACK_FONT_FAMILY}`;

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
      [xs]: { fontSize: '28px', lineHeight: '36px' },
    },

    h2: {
      fontSize: '24px',
      lineHeight: '28px',
      fontWeight: 500,
      fontFamily: HEADING_FONT_FAMILY,
      [xs]: { fontSize: '22px', lineHeight: '26px' },
    },

    h3: {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 500,
      fontFamily: HEADING_FONT_FAMILY,
      [xs]: { fontSize: '20px', lineHeight: '26px' },
    },

    h4: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 500,
      [xs]: { fontSize: '17px', lineHeight: '26px' },
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

export function overrideTypography(theme: SuperDispatchTheme) {
  theme.props.MuiTypography = { variant: 'body2' };
}
