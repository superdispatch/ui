import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

export function overrideCard(theme: SuperDispatchTheme): void {
  theme.props.MuiCard = { variant: 'outlined' };

  theme.overrides.MuiCardContent = {
    root: { '&:last-child': { paddingBottom: undefined } },
  };
}
