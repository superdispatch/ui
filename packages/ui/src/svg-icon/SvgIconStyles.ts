import { IconProps } from '@material-ui/core/Icon';

import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

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

export function applySvgIconStyles(theme: SuperDispatchTheme) {
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
