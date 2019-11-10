import { Theme } from '@material-ui/core';

export function applyMenuStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiMenu = {
    keepMounted: true,
    getContentAnchorEl: null,
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    transformOrigin: { vertical: 'top', horizontal: 'left' },
  };

  theme.props.MuiMenuItem = {
    dense: true,
  };

  theme.overrides.MuiMenuItem = {
    root: {
      fontSize: '14px',
      lineHeight: '20px',
      paddingTop: '8px',
      paddingBottom: '8px',
    },
  };
}
