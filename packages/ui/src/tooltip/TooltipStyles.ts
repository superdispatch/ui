import { Theme } from '@material-ui/core';

import { Color } from '../theme/Color';
import { fontHeightVariant, fontSizeVariant } from '../theme/TypographyStyles';

export function applyTooltipStyles(theme: Theme) {
  theme.overrides = theme.overrides || {};

  theme.overrides.MuiTooltip = {
    tooltip: {
      position: 'relative',
      backgroundColor: Color.Grey400,
      padding: theme.spacing(1, 1.5),
      fontSize: fontSizeVariant('body1'),
      lineHeight: fontHeightVariant('body1'),
    },
  };
}
