import { Theme } from '@material-ui/core';

import { Color } from '../theme/Color';

export function applyIconButtonStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiIconButton = {
    disableTouchRipple: true,
  };

  theme.overrides.MuiIconButton = {
    root: {
      backgroundColor: Color.Transparent,
      transition: theme.transitions.create(['color', 'background-color'], {
        duration: theme.transitions.duration.short,
      }),

      '&:hover': { backgroundColor: Color.Transparent },

      '&$disabled': { color: Color.Silver500 },
    },
    colorPrimary: {
      color: Color.Grey100,
      '&:hover': { backgroundColor: Color.Transparent },
      '&:active': { color: Color.Blue500 },
      '&:hover ': { color: Color.Blue300 },
      '&:focus': { backgroundColor: Color.Blue50 },
    },
  };
}
