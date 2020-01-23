import {
  ThemeStyle,
  TypographyOptions,
  TypographyStyleOptions,
} from '@material-ui/core/styles/createTypography';

import { SuperDispatchTheme } from '../theme/ThemeProvider';

export type ThemePlatform = 'desktop' | 'mobile';

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

export function fontFamilyVariant(variant: ThemeStyle) {
  const mainFont =
    variant !== 'h1' && variant !== 'h2' && variant !== 'h3'
      ? 'SF Pro Text'
      : 'SF Pro Display';

  return `${mainFont}, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif`;
}

export function typographyVariant(
  variant: ThemeStyle,
  platform: ThemePlatform,
): TypographyStyleOptions {
  return {
    fontSize: fontSizeVariant(variant, platform),
    lineHeight: fontHeightVariant(variant, platform),

    ...(platform === 'mobile' && {
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
  return {
    fontFamily: fontFamilyVariant('body2'),

    h1: typographyVariant('h1', 'mobile'),
    h2: typographyVariant('h2', 'mobile'),
    h3: typographyVariant('h3', 'mobile'),
    h4: typographyVariant('h4', 'mobile'),
    h5: typographyVariant('h5', 'mobile'),
    h6: typographyVariant('h6', 'mobile'),

    body2: typographyVariant('body2', 'mobile'),
    body1: typographyVariant('body1', 'mobile'),

    caption: typographyVariant('caption', 'mobile'),
  };
}

function responsiveTypographyVariant(
  theme: SuperDispatchTheme,
  variant: ThemeStyle,
) {
  return {
    [theme.breakpoints.up('sm')]: typographyVariant(variant, 'desktop'),
  };
}

export function applyTypographyStyles(theme: SuperDispatchTheme) {
  theme.props.MuiTypography = { variant: 'body2' };

  Object.assign(theme.typography.h1, responsiveTypographyVariant(theme, 'h1'));
  Object.assign(theme.typography.h2, responsiveTypographyVariant(theme, 'h2'));
  Object.assign(theme.typography.h3, responsiveTypographyVariant(theme, 'h3'));
  Object.assign(theme.typography.h4, responsiveTypographyVariant(theme, 'h4'));
  Object.assign(theme.typography.h5, responsiveTypographyVariant(theme, 'h5'));
  Object.assign(theme.typography.h6, responsiveTypographyVariant(theme, 'h6'));

  Object.assign(
    theme.typography.body2,
    responsiveTypographyVariant(theme, 'body2'),
  );
  Object.assign(
    theme.typography.body1,
    responsiveTypographyVariant(theme, 'body1'),
  );

  Object.assign(
    theme.typography.caption,
    responsiveTypographyVariant(theme, 'caption'),
  );
}
