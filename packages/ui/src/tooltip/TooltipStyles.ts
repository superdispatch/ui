import { Theme } from '@material-ui/core';

import { Color } from '../theme/Color';

export enum TooltipClassNames {
  Arrow = 'Tooltip-arrow',
}

export function applyTooltipStyles(theme: Theme) {
  theme.overrides = theme.overrides || {};

  theme.overrides.MuiTooltip = {
    popper: {
      [`& .${TooltipClassNames.Arrow}`]: {
        width: 8,
        height: 8,
        content: '""',
        position: 'absolute',
        pointerEvents: 'none',
        backgroundColor: Color.Grey400,
      },

      [`&[x-placement*="bottom"] .${TooltipClassNames.Arrow}`]: {
        left: '50%',
        bottom: '100%',
        borderTopLeftRadius: 2,
        transform: 'translate3d(0, 5px, 0) rotate3d(0, 0, 1, 45deg)',
      },
      [`&[x-placement="bottom-end"] .${TooltipClassNames.Arrow}`]: {
        transform: 'translate3d(3px, 5px, 0) rotate3d(0, 0, 1, 45deg)',
      },
      [`&[x-placement="bottom-start"] .${TooltipClassNames.Arrow}`]: {
        transform: 'translate3d(-3px, 5px, 0) rotate3d(0, 0, 1, 45deg)',
      },

      [`&[x-placement*="top"] .${TooltipClassNames.Arrow}`]: {
        top: '100%',
        left: '50%',
        borderBottomRightRadius: 2,
        transform: 'translate3d(0, -5px, 0) rotate3d(0, 0, 1, 45deg)',
      },
      [`&[x-placement="top-end"] .${TooltipClassNames.Arrow}`]: {
        transform: 'translate3d(3px, -5px, 0) rotate3d(0, 0, 1, 45deg)',
      },
      [`&[x-placement="top-start"] .${TooltipClassNames.Arrow}`]: {
        transform: 'translate3d(-3px, -5px, 0) rotate3d(0, 0, 1, 45deg)',
      },

      [`&[x-placement*="right"] .${TooltipClassNames.Arrow}`]: {
        top: '50%',
        right: '100%',
        borderBottomLeftRadius: 2,
        transform: 'translate3d(5px, 0, 0) rotate3d(0, 0, 1, 45deg)',
      },

      [`&[x-placement*="left"] .${TooltipClassNames.Arrow}`]: {
        top: '50%',
        left: '100%',
        borderTopRightRadius: 2,
        transform: 'translate3d(-5px, 0, 0) rotate3d(0, 0, 1, 45deg)',
      },
    },

    tooltip: {
      fontSize: '14px',
      lineHeight: '20px',
      padding: '8px 12px',
      position: 'relative',
      backgroundColor: Color.Grey400,
    },
  };
}
