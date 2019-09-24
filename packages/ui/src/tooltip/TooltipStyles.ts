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
        backfaceVisibility: 'hidden',
        backgroundColor: Color.Grey400,
        filter: 'blur(0)',
        transform: 'translate3d(0, 0, 0) rotate3d(0, 0, 1, 0deg) scale3d(1, 1, 1)',
      },

      [`&[x-placement*="bottom"] .${TooltipClassNames.Arrow}`]: {
        bottom: '100%',
        borderTopLeftRadius: 2,
        transform: 'translate3d(0, 5px, 0) rotate3d(0, 0, 1, 45deg) scale3d(1, 1, 1)',
      },
      [`&[x-placement="bottom-end"] .${TooltipClassNames.Arrow}`]: {
        transform: 'translate3d(3px, 5px, 0) rotate3d(0, 0, 1, 45deg) scale3d(1, 1, 1)',
      },
      [`&[x-placement="bottom-start"] .${TooltipClassNames.Arrow}`]: {
        transform: 'translate3d(-3px, 5px, 0) rotate3d(0, 0, 1, 45deg) scale3d(1, 1, 1)',
      },

      [`&[x-placement*="top"] .${TooltipClassNames.Arrow}`]: {
        top: '100%',
        borderBottomRightRadius: 2,
        transform: 'translate3d(0, -5px, 0) rotate3d(0, 0, 1, 45deg) scale3d(1, 1, 1)',
      },
      [`&[x-placement="top-end"] .${TooltipClassNames.Arrow}`]: {
        transform: 'translate3d(3px, -5px, 0) rotate3d(0, 0, 1, 45deg) scale3d(1, 1, 1)',
      },
      [`&[x-placement="top-start"] .${TooltipClassNames.Arrow}`]: {
        transform: 'translate3d(-3px, -5px, 0) rotate3d(0, 0, 1, 45deg) scale3d(1, 1, 1)',
      },

      [`&[x-placement*="right"] .${TooltipClassNames.Arrow}`]: {
        right: '100%',
        borderBottomLeftRadius: 2,
        transform: 'translate3d(5px, 0, 0) rotate3d(0, 0, 1, 45deg) scale3d(1, 1, 1)',
      },

      [`&[x-placement*="left"] .${TooltipClassNames.Arrow}`]: {
        left: '100%',
        borderTopRightRadius: 2,
        transform: 'translate3d(-5px, 0, 0) rotate3d(0, 0, 1, 45deg) scale3d(1, 1, 1)',
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
