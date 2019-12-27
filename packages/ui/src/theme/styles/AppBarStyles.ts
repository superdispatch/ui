import { SuperDispatchTheme } from '../ThemeProvider';

export function applyAppBarStyles(theme: SuperDispatchTheme) {
  theme.props.MuiAppBar = {
    elevation: 0,
    color: 'inherit',
    position: 'static',
  };
}
