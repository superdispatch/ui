import { Theme } from '@material-ui/core';

import { Color } from './Color';

export function applySvgIconStyles(theme: Theme) {
  theme.overrides = theme.overrides || {};

  theme.overrides.MuiSvgIcon = {
    root: { fontSize: 24, [theme.breakpoints.only('xs')]: { fontSize: 32 } },
    fontSizeSmall: { fontSize: 16, [theme.breakpoints.only('xs')]: { fontSize: 24 } },
    fontSizeLarge: { fontSize: 32 },
    colorAction: { color: Color.Grey100 },
  };
}
