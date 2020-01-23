import { SuperDispatchTheme } from '../theme/ThemeProvider';

export function applyMenuStyles(theme: SuperDispatchTheme) {
  theme.props.MuiMenu = {
    keepMounted: true,
    getContentAnchorEl: null,
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    transformOrigin: { vertical: 'top', horizontal: 'left' },
  };

  theme.overrides.MuiMenuItem = {
    root: {
      ...theme.typography.body2,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  };
}
