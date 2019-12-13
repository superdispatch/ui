import { Theme } from '@material-ui/core';

import { Color } from './Color';

export function applySwitchStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiSwitch = {
    color: 'primary',
    disableRipple: true,
    disableFocusRipple: true,
  };

  theme.overrides.MuiSwitch = {
    root: {
      width: theme.spacing(7),
      height: theme.spacing(4),
      padding: theme.spacing(0.5, 1),
    },

    track: {
      opacity: undefined,
      borderRadius: theme.spacing(1.625),
      boxShadow: '0 0 0 0 transparent',

      transition: theme.transitions.create(['box-shadow', 'background-color'], {
        duration: theme.transitions.duration.shortest,
      }),
    },

    thumb: {
      color: Color.White,
      boxShadow: undefined,
      width: theme.spacing(2),
      height: theme.spacing(2),
    },

    switchBase: {
      left: theme.spacing(0.5),
      padding: theme.spacing(1),

      '&$checked': {
        transform: `translateX(${theme.spacing(2)}px)`,
      },

      '&$checked + $track': {
        opacity: undefined,
      },

      '&$disabled + $track': {
        opacity: undefined,
      },
    },

    colorPrimary: {
      '&$checked': {
        color: undefined,

        '&:hover': {
          backgroundColor: undefined,

          '& + $track': {
            backgroundColor: Color.Blue400,
          },
        },
      },

      '& + $track': {
        backgroundColor: Color.Silver500,
      },

      '&$disabled + $track': {
        backgroundColor: Color.Silver300,
      },

      '&:hover + $track': {
        backgroundColor: Color.Grey100,
      },

      '&.Mui-focusVisible + $track': {
        boxShadow: `0 0 0 3px ${Color.Blue100}`,
      },
    },
  };
}
