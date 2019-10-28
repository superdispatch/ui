import { Theme } from '@material-ui/core';

export function applyCardStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiCard = {
    elevation: 0,
  };

  theme.overrides.MuiCardContent = {
    root: {
      '&:last-child': {
        paddingBottom: undefined,
      },
    },
  };
}
