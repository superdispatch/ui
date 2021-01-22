import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

export function overrideSvgIcon(theme: SuperDispatchTheme): void {
  const sm = theme.breakpoints.up('sm');

  theme.overrides.MuiSvgIcon = {
    root: {
      display: 'inherit',

      fontSize: 'var(--mui-svg-icon-size, 32px)',
      [sm]: {
        fontSize: 'var(--mui-svg-icon-size, 24px)',
      },
    },

    fontSizeSmall: {
      fontSize: 'var(--mui-svg-icon-size, 24px)',
      [sm]: {
        fontSize: 'var(--mui-svg-icon-size, 16px)',
      },
    },

    fontSizeLarge: {
      fontSize: 'var(--mui-svg-icon-size, 32px)',
    },

    colorAction: {
      color: Color.Grey100,
    },
  };
}
