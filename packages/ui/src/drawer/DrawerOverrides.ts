import { SuperDispatchTheme } from '../theme/ThemeProvider';

export function overrideDrawer(theme: SuperDispatchTheme) {
  theme.props.MuiDrawer = {
    anchor: 'right',
  };

  theme.overrides.MuiDrawer = {
    paper: {
      maxWidth: '100%',
      minWidth: '100%',

      [theme.breakpoints.up('sm')]: {
        minWidth: theme.spacing(54),
        maxWidth: theme.breakpoints.width('sm'),
      },
    },
  };
}
