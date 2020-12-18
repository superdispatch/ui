import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

export function overrideSvgIcon(theme: SuperDispatchTheme): void {
  const sm = theme.breakpoints.up('sm');

  theme.props.MuiSvgIcon = {
    color: 'action',
  };

  theme.overrides.MuiSvgIcon = {
    root: {
      display: 'inherit',
      fontSize: theme.spacing(4),
      [sm]: { fontSize: theme.spacing(3) },
    },

    fontSizeSmall: {
      fontSize: theme.spacing(3),
      [sm]: { fontSize: theme.spacing(2) },
    },

    fontSizeLarge: {
      fontSize: theme.spacing(4),
    },

    colorAction: {
      color: Color.Grey100,
    },
  };
}
