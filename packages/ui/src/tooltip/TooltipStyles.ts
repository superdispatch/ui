import { Theme } from '@material-ui/core';
import { TooltipProps } from '@material-ui/core/Tooltip';

import { Color } from '../theme/Color';

export enum TooltipClassNames {
  Arrow = 'Tooltip-arrow',
}

const arrowSelector = (placement?: TooltipProps['placement']) =>
  `&${
    !placement
      ? '[x-placement]'
      : placement.includes('-')
      ? `[x-placement="${placement}"]`
      : `[x-placement*="${placement}"]`
  } .${TooltipClassNames.Arrow}`;

const transformArrow = (x: number, y: number) =>
  `translate3d(${x}px, ${y}px, 0) rotate3d(0, 0, 1, 45deg) scale3d(1, 1, 1)`;

export function applyTooltipStyles(theme: Theme) {
  theme.overrides = theme.overrides || {};

  theme.overrides.MuiTooltip = {
    popper: {
      [arrowSelector()]: {
        width: 8,
        height: 8,
        content: '""',
        position: 'absolute',
        pointerEvents: 'none',
        backfaceVisibility: 'hidden',
        backgroundColor: Color.Grey400,
        transform: transformArrow(0, 0),
      },

      [arrowSelector('bottom')]: {
        top: 0,
        borderTopLeftRadius: 2,
        transform: transformArrow(0, -3),
      },
      [arrowSelector('bottom-end')]: { transform: transformArrow(3, -3) },
      [arrowSelector('bottom-start')]: { transform: transformArrow(-3, -3) },

      [arrowSelector('top')]: {
        bottom: 0,
        borderBottomRightRadius: 2,
        transform: transformArrow(0, 3),
      },
      [arrowSelector('top-end')]: { transform: transformArrow(3, 3) },
      [arrowSelector('top-start')]: { transform: transformArrow(-3, 3) },

      [arrowSelector('right')]: {
        left: 0,
        borderBottomLeftRadius: 2,
        transform: transformArrow(-3, 0),
      },

      [arrowSelector('left')]: {
        right: 0,
        borderTopRightRadius: 2,
        transform: transformArrow(3, 0),
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
