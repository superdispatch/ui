import { Theme } from '@material-ui/core';
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

const typographyVariants: Variant[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body2',
  'body1',
  'button',
  'caption',
];

function px(value: number): string {
  return `${value}px`;
}

function xsOnly(theme: Theme): string {
  return theme.breakpoints.only('xs');
}

export function getTypographyProp(
  theme: Theme,
  platform: ThemePlatform,
  variant: Variant,
  prop: 'fontSize' | 'lineHeight',
): string | undefined {
  let css = theme.typography[variant];

  if (platform === 'mobile') {
    css = css[xsOnly(theme)] as CSSProperties;
  }

  return css?.[prop] as string;
}

function getFontSize(variant: Variant): number {
  switch (variant) {
    case 'h1':
      return 32;
    case 'h2':
      return 24;
    case 'h3':
      return 20;
    case 'h4':
      return 16;
    case 'h6':
    case 'caption':
      return 12;
    default:
      return 14;
  }
}

function toMobileFontSize(fontSize: CSSProperties['fontSize']): number {
  return parseInt(fontSize as string, 10) + 2;
}

function toFontHeight(fontSize: CSSProperties['fontSize']): number {
  switch (parseInt(fontSize as string, 10)) {
    case 34:
      return 44;
    case 32:
      return 40;
    case 26:
    case 22:
      return 32;
    case 24:
    case 20:
    case 18:
      return 28;
    case 16:
      return 24;
    case 12:
      return 16;
    default:
    case 14:
      return 20;
  }
}

export function createTypographyOptions(): TypographyOptions {
  const options: TypographyOptions = { fontFamily: CONTENT_FONT_FAMILY };

  typographyVariants.forEach((variant: Variant) => {
    const fontSize = getFontSize(variant);

    options[variant] = {
      fontSize: px(fontSize),
      lineHeight: px(toFontHeight(fontSize)),

      fontFamily:
        variant !== 'h1' && variant !== 'h2' && variant !== 'h3'
          ? CONTENT_FONT_FAMILY
          : HEADING_FONT_FAMILY,

      fontWeight:
        variant === 'h1' || variant === 'h6'
          ? 700
          : variant === 'h2' || variant === 'h3' || variant === 'h4'
          ? 500
          : variant === 'h5' || variant === 'body1' || variant === 'button'
          ? 600
          : 400,

      letterSpacing: variant === 'h6' ? '0.1em' : undefined,
      textTransform: variant === 'h6' ? 'uppercase' : undefined,
    };
  });

  return options;
}

function responsiveTypography(theme: SuperDispatchTheme) {
  typographyVariants.forEach((variant: Variant) => {
    const css = theme.typography[variant];
    const fontSize = toMobileFontSize(css.fontSize);

    css[xsOnly(theme)] = {
      fontSize: px(fontSize),
      lineHeight: px(toFontHeight(fontSize)),
    };
  });
}

export function applyTypographyStyles(theme: SuperDispatchTheme) {
  responsiveTypography(theme);

  theme.props.MuiTypography = { variant: 'body2' };
}
