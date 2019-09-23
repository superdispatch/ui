import { Theme } from '@material-ui/core';

import { Color } from '../theme/Color';

export enum SnackbarClassNames {
  Icon = 'Snackbar-icon',
  Default = 'Snackbar-variantDefault',
  Success = 'Snackbar-variantSuccess',
  Error = 'Snackbar-variantError',
}

export function applySnackbarStyles(theme: Theme) {
  theme.overrides = theme.overrides || {};
  theme.overrides.MuiSnackbarContent = {
    root: {
      minHeight: '60px',

      [theme.breakpoints.up('sm')]: { width: '432px', maxWidth: '432px' },

      [`.${SnackbarClassNames.Default} &`]: {
        color: Color.Grey500,
        backgroundColor: Color.White,
      },
      [`.${SnackbarClassNames.Success} &`]: {
        backgroundColor: Color.Green300,
      },
      [`.${SnackbarClassNames.Error} &`]: {
        backgroundColor: Color.Red300,
      },
    },

    message: {
      flex: 1,
      display: 'flex',

      [`& .${SnackbarClassNames.Icon}`]: {
        fontSize: '16px',
        marginTop: '2px',
        marginRight: '8px',
      },
    },
  };
}
