import { Theme } from '@material-ui/core';

export function applyAppBarStyles(theme: Required<Theme>) {
  theme.props.MuiAppBar = {
    elevation: 0,
    color: 'inherit',
    position: 'static',
  };
}
