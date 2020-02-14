import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

export function applyListStyles(theme: SuperDispatchTheme) {
  theme.overrides.MuiListItem = {
    root: {
      '&$selected, &$selected:hover': { backgroundColor: Color.Blue50 },
      '& .MuiTouchRipple-root': { color: Color.Blue100 },
    },
  };
}
