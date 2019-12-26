import { Theme } from '@material-ui/core';

export function applyFormControlStyles(theme: Required<Theme>) {
  theme.overrides.MuiFormControlLabel = {
    root: {
      marginLeft: theme.spacing(-1),
    },

    labelPlacementStart: {
      marginRight: theme.spacing(-1),
    },
  };
}
