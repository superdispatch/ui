import { Theme } from '@material-ui/core';

export function applyFormControlStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.overrides.MuiFormControlLabel = {
    root: {
      marginLeft: theme.spacing(-1),
    },

    labelPlacementStart: {
      marginRight: theme.spacing(-1),
    },
  };
}
