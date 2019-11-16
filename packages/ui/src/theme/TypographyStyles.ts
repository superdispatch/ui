import { Theme } from '@material-ui/core';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import { CSSProperties } from '@material-ui/styles';

function fontFamily(font: string) {
  return `${font}, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif`;
}

function textVariant(
  theme: Theme,
  font: string,
  fontWeight: number,
  fontSizeDesktop: string,
  fontSizeMobile: string,
  lineHeightDesktop: string,
  lineHeightMobile: string,
): CSSProperties {
  return {
    fontWeight,
    fontFamily: fontFamily(font),
    fontSize: fontSizeMobile,
    lineHeight: lineHeightMobile,
    [theme.breakpoints.up('sm')]: { fontSize: fontSizeDesktop, lineHeight: lineHeightDesktop },
  };
}

export function createTypographyOptions(): TypographyOptions {
  return { fontFamily: fontFamily('SF Pro Text') };
}

export function applyTypographyStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiTypography = { variant: 'body2' };

  theme.overrides.MuiTypography = {
    h1: textVariant(theme, 'SF Pro Display', 700, '40px', '44px', '32px', '34px'),
    h2: textVariant(theme, 'SF Pro Display', 500, '24px', '26px', '28px', '32px'),
    h3: textVariant(theme, 'SF Pro Display', 500, '20px', '22px', '28px', '32px'),
    h4: textVariant(theme, 'SF Pro Text', 500, '16px', '18px', '24px', '28px'),
    h5: textVariant(theme, 'SF Pro Text', 600, '14px', '16px', '20px', '24px'),
    h6: textVariant(theme, 'SF Pro Text', 700, '12px', '13px', '16px', '18px'),
    body2: textVariant(theme, 'SF Pro Text', 400, '14px', '16px', '20px', '24px'),
    body1: textVariant(theme, 'SF Pro Text', 600, '14px', '16px', '20px', '24px'),
    caption: textVariant(theme, 'SF Pro Text', 400, '12px', '13px', '16px', '18px'),
  };
}
