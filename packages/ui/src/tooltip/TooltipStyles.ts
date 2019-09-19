import { Theme } from '@material-ui/core';

import { Color } from '..';

export function applyTooltipStyles(theme: Theme) {
  theme.overrides = theme.overrides || {};

  theme.overrides.MuiTooltip = {
    tooltip: {
      fontSize: '12px',
      lineHeight: '16px',
      backgroundColor: Color.Grey400,
    },
  };
}
