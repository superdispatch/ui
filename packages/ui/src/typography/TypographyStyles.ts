import {
  ThemeStyle,
  TypographyOptions,
  TypographyStyleOptions,
} from '@material-ui/core/styles/createTypography';

import { SuperDispatchTheme } from '../theme/ThemeProvider';

export type ThemePlatform = 'desktop' | 'mobile';

const typographyVariants: ThemeStyle[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body2',
  'body1',
  'caption',
];

export function fontWeightVariant(variant: ThemeStyle): number {
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
export function fontSizeVariant(
  variant: ThemeStyle,
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

export function fontHeightVariant(
  variant: ThemeStyle,
  platform: ThemePlatform,
) {
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

function fontFamilyVariant(variant: ThemeStyle) {
  const mainFont =
    variant !== 'h1' && variant !== 'h2' && variant !== 'h3'
      ? 'SF Pro Text'
      : 'SF Pro Display';

  return `${mainFont}, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif`;
}

function typographyVariant(
  variant: ThemeStyle,
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

      ...(variant === 'h6' && {
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }),
    }),
  };
}

export function createTypographyOptions(): TypographyOptions {
  const options: TypographyOptions = {
    fontFamily: fontFamilyVariant('body2'),
  };

  typographyVariants.forEach((variant: ThemeStyle) => {
    options[variant] = typographyVariant(variant, 'desktop');
  });

  return options;
}

function responsiveTypography(theme: SuperDispatchTheme) {
  typographyVariants.forEach((variant: ThemeStyle) => {
    Object.defineProperty(
      theme.typography[variant],

      // We're not using `up('sm')` here so this selector would not be
      // overridden later.
      theme.breakpoints.only('xs'),
      { enumerable: true, value: typographyVariant(variant, 'mobile') },
    );
  });
}

export function applyTypographyStyles(theme: SuperDispatchTheme) {
  responsiveTypography(theme);

  theme.props.MuiTypography = { variant: 'body2' };
}
