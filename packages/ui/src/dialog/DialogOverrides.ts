import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

export function overrideDialog(theme: SuperDispatchTheme): void {
  theme.props.MuiDialogTitle = { disableTypography: true };

  theme.overrides.MuiDialog = {
    paper: {
      margin: theme.spacing(3),
    },
  };

  theme.overrides.MuiDialogTitle = {
    root: { ...theme.typography.h3 },
  };

  theme.overrides.MuiDialogContent = {
    root: { padding: theme.spacing(0, 3) },
  };

  theme.overrides.MuiDialogActions = {
    root: { padding: theme.spacing(3) },

    spacing: {
      '& > :not(:first-child)': { marginLeft: theme.spacing(2) },
    },
  };
}
