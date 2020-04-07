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

export function overrideSvgIcon(theme: SuperDispatchTheme) {
  const xs = theme.breakpoints.only('xs');

  theme.overrides.MuiSvgIcon = {
    root: {
      fontSize: iconSizeVariant('default'),
      [xs]: { fontSize: iconSizeVariant('default', true) },
    },
    fontSizeSmall: {
      fontSize: iconSizeVariant('small'),
      [xs]: { fontSize: iconSizeVariant('small', true) },
    },
    fontSizeLarge: { fontSize: iconSizeVariant('large') },
    colorAction: { color: Color.Grey100 },
  };
}
