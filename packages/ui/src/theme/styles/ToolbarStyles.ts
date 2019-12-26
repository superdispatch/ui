import { Theme } from '@material-ui/core';

export function applyToolbarStyles(theme: Required<Theme>) {
  theme.overrides.MuiToolbar = {
    regular: {
      minHeight: theme.spacing(8),
    },

    gutters: {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
  };
}
