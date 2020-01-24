import {
  TypographyOptions,
  TypographyStyleOptions,
  Variant,
} from '@material-ui/core/styles/createTypography';
import { CSSProperties } from '@material-ui/styles';

import { SuperDispatchTheme } from '../theme/ThemeProvider';

export type ThemePlatform = 'desktop' | 'mobile';

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

function xsOnly(theme: SuperDispatchTheme): string {
  return theme.breakpoints.only('xs');
}

export function getTypographyProp(
  theme: SuperDispatchTheme,
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

export function fontWeightVariant(variant: Variant): number {
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
    case 'button':
      return 600;
    default:
      return 400;
  }
}
export function fontSizeVariant(
  variant: Variant,
  platform: ThemePlatform,
): string {
  const isMobile = platform === 'mobile';

  switch (variant) {
    case 'h1':
      return `${isMobile ? 34 : 32}px`;
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

export function fontHeightVariant(variant: Variant, platform: ThemePlatform) {
  const isMobile = platform === 'mobile';

  switch (variant) {
    case 'h1':
      return `${isMobile ? 44 : 40}px`;
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

function fontFamilyVariant(variant: Variant) {
  const mainFont =
    variant !== 'h1' && variant !== 'h2' && variant !== 'h3'
      ? 'SF Pro Text'
      : 'SF Pro Display';

  return `${mainFont}, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif`;
}

function typographyVariant(
  variant: Variant,
  platform: ThemePlatform,
): TypographyStyleOptions {
  return {
    fontSize: fontSizeVariant(variant, platform),
    lineHeight: fontHeightVariant(variant, platform),

    // We have to make Typography desktop first in order to keep it consistent
    // with material-ui.
    ...(platform === 'desktop' && {
      fontFamily: fontFamilyVariant(variant),
      fontWeight: fontWeightVariant(variant),

      letterSpacing: variant === 'h6' ? '0.1em' : undefined,
      textTransform: variant === 'h6' ? 'uppercase' : undefined,
    }),
  };
}

export function createTypographyOptions(): TypographyOptions {
  const options: TypographyOptions = {
    fontFamily: fontFamilyVariant('body2'),
  };

  typographyVariants.forEach((variant: Variant) => {
    options[variant] = typographyVariant(variant, 'desktop');
  });

  return options;
}

function responsiveTypography(theme: SuperDispatchTheme) {
  typographyVariants.forEach((variant: Variant) => {
    theme.typography[variant][xsOnly(theme)] = typographyVariant(
      variant,
      'mobile',
    );
  });
}

export function applyTypographyStyles(theme: SuperDispatchTheme) {
  responsiveTypography(theme);

  theme.props.MuiTypography = { variant: 'body2' };
}
