import { Theme } from '@material-ui/core';

import { Color } from '..';

export function applyTooltipStyles(theme: Theme) {
  theme.overrides = theme.overrides || {};

  theme.overrides.MuiTooltip = {
    tooltip: {
      fontSize: '14px',
      lineHeight: '20px',
      position: 'relative',
      backgroundColor: Color.Grey400,

      '&:after': {
        width: 8,
        height: 8,
        content: '""',
        position: 'absolute',
        pointerEvents: 'none',
        backgroundColor: Color.Grey400,

        '$popper[x-placement*="bottom"] &': {
          left: '50%',
          bottom: '100%',
          borderTopLeftRadius: 2,
          transform: 'translate3d(-50%, 60%, 0) rotate3d(0, 0, 1, 45deg)',
        },

        '$popper[x-placement*="top"] &': {
          top: '100%',
          left: '50%',
          borderBottomRightRadius: 2,
          transform: 'translate3d(-50%, -60%, 0) rotate3d(0, 0, 1, 45deg)',
        },

        '$popper[x-placement*="right"] &': {
          top: '50%',
          right: '100%',
          borderBottomLeftRadius: 2,
          transform: 'translate3d(60%, -50%, 0) rotate3d(0, 0, 1, 45deg)',
        },

        '$popper[x-placement*="left"] &': {
          top: '50%',
          left: '100%',
          borderTopRightRadius: 2,
          transform: 'translate3d(-60%, -50%, 0) rotate3d(0, 0, 1, 45deg)',
        },
      },
    },
  };
}
