import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

export function overrideList(theme: SuperDispatchTheme): void {
  theme.overrides.MuiListItem = {
    root: {
      '&$selected, &$selected:hover': { backgroundColor: Color.Blue50 },
      '& .MuiTouchRipple-root': { color: Color.Blue100 },
    },
  };
}
