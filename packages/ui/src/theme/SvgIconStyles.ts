import { Theme } from '@material-ui/core';
import { IconProps } from '@material-ui/core/Icon';

import { Color } from './Color';

export function iconSizeVariant(
  size?: IconProps['fontSize'],
  isMobile = false,
): string {
  switch (size) {
    case 'small':
      return `${isMobile ? 24 : 16}px`;
    case 'large':
      return '32px';
    default:
      return `${isMobile ? 32 : 24}px`;
  }
}

export function applySvgIconStyles(theme: Theme) {
  theme.overrides = theme.overrides || {};

  theme.overrides.MuiSvgIcon = {
    root: {
      fontSize: iconSizeVariant('default'),
      [theme.breakpoints.only('xs')]: {
        fontSize: iconSizeVariant('default', true),
      },
    },
    fontSizeSmall: {
      fontSize: iconSizeVariant('small'),
      [theme.breakpoints.only('xs')]: {
        fontSize: iconSizeVariant('small', true),
      },
    },
    fontSizeLarge: { fontSize: iconSizeVariant('large') },
    colorAction: { color: Color.Grey100 },
  };
}
