import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

export function overrideTooltip(theme: SuperDispatchTheme) {
  theme.props.MuiTooltip = { arrow: true };

  theme.overrides.MuiTooltip = {
    tooltip: {
      ...theme.typography.body2,
      padding: theme.spacing(1, 1.5),
      backgroundColor: Color.Grey400,
    },

    popperArrow: {
      '&[x-placement*="top"] $arrow': {
        '&::before': { borderBottomRightRadius: 2 },
      },
      '&[x-placement*="left"] $arrow': {
        '&::before': { borderTopRightRadius: 2 },
      },
      '&[x-placement*="right"] $arrow': {
        '&::before': { borderBottomLeftRadius: 2 },
      },
      '&[x-placement*="bottom"] $arrow': {
        '&::before': { borderTopLeftRadius: 2 },
      },
    },

    arrow: {
      color: Color.Grey400,
      fontSize: theme.spacing(1),
    },
  };
}
