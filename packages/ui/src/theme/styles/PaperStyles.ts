import { Color } from '../Color';
import { SuperDispatchTheme } from '../ThemeProvider';

export function applyPaperStyles(theme: SuperDispatchTheme) {
  theme.props.MuiPaper = { elevation: 0 };

  theme.overrides.MuiPaper = {
    elevation0: { border: `1px solid ${Color.Silver400}` },
  };
}
