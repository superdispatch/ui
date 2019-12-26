import { Theme } from '@material-ui/core';

export function applyFormControlStyles(theme: Required<Theme>) {
  theme.overrides.MuiFormControlLabel = {};
}
