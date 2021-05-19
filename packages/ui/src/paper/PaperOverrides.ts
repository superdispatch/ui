import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

export function overridePaper(theme: SuperDispatchTheme): void {
  theme.props.MuiPaper = { variant: 'outlined' };
}
