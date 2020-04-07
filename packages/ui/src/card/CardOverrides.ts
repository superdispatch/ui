import { SuperDispatchTheme } from '../theme/ThemeProvider';

export function overrideCard(theme: SuperDispatchTheme) {
  theme.props.MuiCard = { elevation: 0 };

  theme.overrides.MuiCardContent = {
    root: { '&:last-child': { paddingBottom: undefined } },
  };
}
