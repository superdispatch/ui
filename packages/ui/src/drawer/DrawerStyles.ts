import { SuperDispatchTheme } from '../theme/ThemeProvider';

export function applyDrawerStyles(theme: SuperDispatchTheme) {
  theme.props.MuiDrawer = {
    anchor: 'right',
  };

  theme.overrides.MuiDrawer = {
    paper: {
      minWidth: theme.spacing(54),
    },
  };
}
