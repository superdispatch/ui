import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

export function overrideCard(theme: SuperDispatchTheme): void {
  theme.props.MuiCard = { elevation: 0 };

  theme.overrides.MuiCardContent = {
    root: { '&:last-child': { paddingBottom: undefined } },
  };
}
