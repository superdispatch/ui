import {
  ThemeStyle,
  TypographyOptions,
} from '@material-ui/core/styles/createTypography';
import { CSSProperties } from '@material-ui/styles';

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

export function createTypographyOptions(): TypographyOptions {
  return { fontFamily: fontFamilyVariant('body2') };
}

export function typographyVariant(
  variant: ThemeStyle,
  platform: ThemePlatform,
): CSSProperties {
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

function buildTypographyVariant(
  theme: SuperDispatchTheme,
  variant: ThemeStyle,
) {
  return {
    ...typographyVariant(variant, 'mobile'),
    [theme.breakpoints.up('sm')]: typographyVariant(variant, 'desktop'),
  };
}

export function applyTypographyStyles(theme: SuperDispatchTheme) {
  theme.props.MuiTypography = { variant: 'body2' };

  theme.overrides.MuiTypography = {
    h1: buildTypographyVariant(theme, 'h1'),
    h2: buildTypographyVariant(theme, 'h2'),
    h3: buildTypographyVariant(theme, 'h3'),
    h4: buildTypographyVariant(theme, 'h4'),
    h5: buildTypographyVariant(theme, 'h5'),
    h6: buildTypographyVariant(theme, 'h6'),

    body2: buildTypographyVariant(theme, 'body2'),
    body1: buildTypographyVariant(theme, 'body1'),

    caption: buildTypographyVariant(theme, 'caption'),
  };
}
