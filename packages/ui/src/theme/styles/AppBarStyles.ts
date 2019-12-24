import { Theme } from '@material-ui/core';

export function applyAppBarStyles(theme: Theme) {
  theme.props = theme.props || {};

  theme.props.MuiAppBar = {
    elevation: 0,
    color: 'inherit',
    position: 'static',
  };
}
