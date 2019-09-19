import { Theme } from '@material-ui/core';

export function applyLinkStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiLink = {
    underline: 'none',
  };

  theme.overrides.MuiLink = {
    button: { textAlign: 'initial' },
  };
}
