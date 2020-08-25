import { SuperDispatchTheme } from '../theme/ThemeProvider';

export function overrideDrawer(theme: SuperDispatchTheme) {
  theme.props.MuiDrawer = {
    anchor: 'right',
  };

  theme.overrides.MuiDrawer = {
    paper: {
      maxWidth: '100%',

      [theme.breakpoints.only('xs')]: {
        minWidth: '100%',
      },

      [theme.breakpoints.up('sm')]: {
        maxWidth: '30%',
        minWidth: theme.spacing(54),
      },
    },
  };
}
