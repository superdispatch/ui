import { SuperDispatchTheme } from '../ThemeProvider';

export function applyCardStyles(theme: SuperDispatchTheme) {
  theme.props.MuiCard = { elevation: 0 };

  theme.overrides.MuiCardContent = {
    root: { '&:last-child': { paddingBottom: undefined } },
  };
}
