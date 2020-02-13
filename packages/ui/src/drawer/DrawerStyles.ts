import { SuperDispatchTheme } from '../theme/ThemeProvider';

export function applyDrawerStyles(theme: SuperDispatchTheme) {
  theme.props.MuiDrawer = {
    anchor: 'right',
  };

  theme.overrides.MuiDrawer = {
    paper: {
      maxWidth: '100%',
      minWidth: theme.spacing(54),
    },
  };
}
