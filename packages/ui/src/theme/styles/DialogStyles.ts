import { Theme } from '@material-ui/core';

export function applyDialogStyles(theme: Required<Theme>) {
  theme.props.MuiDialogTitle = {
    disableTypography: true,
  };

  theme.overrides.MuiDialogContent = {
    root: {
      padding: theme.spacing(0, 3),
    },
  };

  theme.overrides.MuiDialogActions = {
    root: {
      padding: theme.spacing(3),
    },

    spacing: {
      '& > :not(:first-child)': {
        marginLeft: theme.spacing(2),
      },
    },
  };
}
