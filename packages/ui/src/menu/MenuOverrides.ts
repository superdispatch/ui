import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

export function overrideMenu(theme: SuperDispatchTheme): void {
  theme.props.MuiMenu = {
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
