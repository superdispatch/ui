import { Theme } from '@material-ui/core';
import {
  ThemeStyle,
  TypographyOptions,
} from '@material-ui/core/styles/createTypography';
import { CSSProperties } from '@material-ui/styles';

export function fontWeightVariant(variant?: ThemeStyle): number {
  switch (variant) {
    case 'h1':
    case 'h6':
      return 700;
    case 'h2':
    case 'h3':
    case 'h4':
      return 500;
    case 'h5':
    case 'body1':
      return 600;
    default:
      return 400;
  }
}
export function fontSizeVariant(variant: ThemeStyle, isMobile = false): string {
  switch (variant) {
    case 'h1':
      return `${isMobile ? 44 : 40}px`;
    case 'h2':
      return `${isMobile ? 26 : 24}px`;
    case 'h3':
      return `${isMobile ? 22 : 20}px`;
    case 'h4':
      return `${isMobile ? 18 : 16}px`;
    case 'h6':
    case 'caption':
      return `${isMobile ? 13 : 12}px`;
    default:
      return `${isMobile ? 16 : 14}px`;
  }
}

export function fontHeightVariant(variant: ThemeStyle, isMobile = false) {
  switch (variant) {
    case 'h1':
      return `${isMobile ? 34 : 32}px`;
    case 'h2':
    case 'h3':
      return `${isMobile ? 32 : 28}px`;
    case 'h4':
      return `${isMobile ? 28 : 24}px`;
    case 'h6':
    case 'caption':
      return `${isMobile ? 18 : 16}px`;
    default:
      return `${isMobile ? 24 : 20}px`;
  }
}

export function fontFamilyVariant(variant?: ThemeStyle) {
  const mainFont =
    variant !== 'h1' && variant !== 'h2' && variant !== 'h3'
      ? 'SF Pro Text'
      : 'SF Pro Display';

  return `${mainFont}, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif`;
}

export function createTypographyOptions(): TypographyOptions {
  return { fontFamily: fontFamilyVariant() };
}

export function typographyVariant(
  theme: Required<Theme>,
  variant: ThemeStyle,
): CSSProperties {
  return {
    fontFamily: fontFamilyVariant(variant),
    fontWeight: fontWeightVariant(variant),
    fontSize: fontSizeVariant(variant, true),
    lineHeight: fontHeightVariant(variant, true),

    letterSpacing: variant === 'h6' ? '0.1em' : undefined,
    textTransform: variant === 'h6' ? 'uppercase' : undefined,

    [theme.breakpoints.up('sm')]: {
      fontSize: fontSizeVariant(variant),
      lineHeight: fontHeightVariant(variant),
    },
  };
}

export function applyTypographyStyles(theme: Required<Theme>) {
  theme.props.MuiTypography = { variant: 'body2' };

  theme.overrides.MuiTypography = {
    h1: typographyVariant(theme, 'h1'),
    h2: typographyVariant(theme, 'h2'),
    h3: typographyVariant(theme, 'h3'),
    h4: typographyVariant(theme, 'h4'),
    h5: typographyVariant(theme, 'h5'),
    h6: typographyVariant(theme, 'h6'),

    body2: typographyVariant(theme, 'body2'),
    body1: typographyVariant(theme, 'body1'),

    caption: typographyVariant(theme, 'caption'),
  };
}
