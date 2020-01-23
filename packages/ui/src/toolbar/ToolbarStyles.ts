import { SuperDispatchTheme } from '../theme/ThemeProvider';

export function applyToolbarStyles(theme: SuperDispatchTheme) {
  theme.overrides.MuiToolbar = {
    regular: { minHeight: theme.spacing(8) },

    gutters: {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
  };
}
