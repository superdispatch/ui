import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

export function overrideAppBar(theme: SuperDispatchTheme) {
  theme.props.MuiAppBar = {
    elevation: 0,
    color: 'inherit',
    position: 'static',
  };
}
