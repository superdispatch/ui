import { Theme } from '@material-ui/core';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import { CSSProperties } from '@material-ui/styles';

function fontFamily(font: string) {
  return `${font}, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif`;
}

function makeTextVariant(
  theme: Theme,
  font: string,
  fontWeight: number,
  [fontSizeDesktop, fontSizeMobile]: [string, string],
  [lineHeightDesktop, lineHeightMobile]: [string, string],
): CSSProperties {
  return {
    fontWeight,
    fontFamily: fontFamily(font),

    fontSize: fontSizeMobile,
    lineHeight: lineHeightMobile,

    [theme.breakpoints.up('sm')]: {
      fontSize: fontSizeDesktop,
      lineHeight: lineHeightDesktop,
    },
  };
}

export function createTypographyOptions(): TypographyOptions {
  return {
    fontFamily: fontFamily('SF Pro Text'),
  };
}

export function applyTypographyStyles(theme: Theme) {
  theme.overrides = theme.overrides || {};

  theme.overrides.MuiTypography = {
    h1: makeTextVariant(theme, 'SF Pro Display', 700, ['40px', '44px'], ['32px', '34px']),
    h2: makeTextVariant(theme, 'SF Pro Display', 500, ['24px', '26px'], ['28px', '32px']),
    h3: makeTextVariant(theme, 'SF Pro Display', 500, ['20px', '22px'], ['28px', '32px']),
    h4: makeTextVariant(theme, 'SF Pro Text', 500, ['16px', '18px'], ['24px', '28px']),
    h5: makeTextVariant(theme, 'SF Pro Text', 600, ['14px', '16px'], ['20px', '24px']),
    h6: makeTextVariant(theme, 'SF Pro Text', 700, ['12px', '13px'], ['16px', '18px']),
    body2: makeTextVariant(theme, 'SF Pro Text', 400, ['14px', '16px'], ['20px', '24px']),
    body1: makeTextVariant(theme, 'SF Pro Text', 600, ['14px', '16px'], ['20px', '24px']),
    caption: makeTextVariant(theme, 'SF Pro Text', 400, ['12px', '13px'], ['16px', '18px']),
  };
}
