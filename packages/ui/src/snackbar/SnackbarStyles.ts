import { Theme } from '@material-ui/core';

import { Color } from '../theme/Color';

export enum SnackbarClassNames {
  Icon = 'Snackbar-icon',
  Default = 'Snackbar-variantDefault',
  Success = 'Snackbar-variantSuccess',
  Error = 'Snackbar-variantError',
  StackContainer = 'Snackbar-stackContainer',
  StackItem = 'Snackbar-stackItem',
}

export function applySnackbarStyles(theme: Theme) {
  theme.overrides = theme.overrides || {};

  theme.overrides.MuiSnackbar = {
    root: {
      [`&.${SnackbarClassNames.StackContainer}`]: {
        flexDirection: 'column',
        [`& .${SnackbarClassNames.StackItem}`]: { width: '100%' },
      },
    },

    anchorOriginBottomCenter: {
      [theme.breakpoints.only('xs')]: { left: 0, right: 0, bottom: 0 },
    },
  };

  theme.overrides.MuiSnackbarContent = {
    root: {
      minHeight: '60px',

      [`&.${SnackbarClassNames.Default}`]: { color: Color.Grey500, backgroundColor: Color.White },
      [`&.${SnackbarClassNames.Success}`]: { backgroundColor: Color.Green300 },
      [`&.${SnackbarClassNames.Error}`]: { backgroundColor: Color.Red300 },

      [theme.breakpoints.up('xs')]: { width: '432px', maxWidth: '432px' },
      [theme.breakpoints.only('xs')]: { width: '100%', borderRadius: 0 },
    },

    message: {
      flex: 1,
      display: 'flex',

      [`& .${SnackbarClassNames.Icon}`]: {
        left: 0,
        top: '2px',
        fontSize: '18px',
        marginRight: '8px',
        position: 'relative',

        [theme.breakpoints.up('sm')]: { fontSize: '16px' },
      },
    },
  };
}
