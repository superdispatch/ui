import { SuperDispatchTheme } from '../ThemeProvider';

export function applyFormControlStyles(theme: SuperDispatchTheme) {
  theme.overrides.MuiFormControlLabel = {
    root: { marginLeft: theme.spacing(-1) },
    labelPlacementStart: { marginRight: theme.spacing(-1) },
  };
}
