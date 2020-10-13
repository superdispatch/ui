import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

export function overridePaper(theme: SuperDispatchTheme) {
  theme.props.MuiPaper = { elevation: 0 };

  theme.overrides.MuiPaper = {
    elevation0: { border: `1px solid ${Color.Silver400}` },
  };
}
