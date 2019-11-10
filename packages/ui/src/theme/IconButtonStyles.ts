import { Theme } from '@material-ui/core';

import { Color } from './Color';

export function applyIconButtonStyles(theme: Theme) {
  theme.overrides = theme.overrides || {};

  theme.overrides.MuiIconButton = {
    root: {
      backgroundColor: Color.Transparent,
      transition: theme.transitions.create(['color', 'background-color'], {
        duration: theme.transitions.duration.short,
      }),

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
