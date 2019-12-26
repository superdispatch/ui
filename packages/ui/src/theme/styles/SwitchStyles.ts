import { Theme } from '@material-ui/core';

import { Color } from '../Color';

export function applySwitchStyles(theme: Required<Theme>) {
  theme.props.MuiSwitch = {
    color: 'primary',
    disableRipple: true,
    disableFocusRipple: true,
  };

  theme.overrides.MuiSwitch = {
    root: {
      width: theme.spacing(9.5),
      height: theme.spacing(5.5),
      padding: theme.spacing(0.75, 1.5),

      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(8),
        height: theme.spacing(4),
        padding: theme.spacing(0.5, 1.5),
      },
    },

    track: {
      opacity: undefined,
      boxShadow: '0 0 0 0 transparent',

      transition: theme.transitions.create(['box-shadow', 'background-color'], {
        duration: theme.transitions.duration.shortest,
      }),

      borderRadius: theme.spacing(2),

      [theme.breakpoints.up('sm')]: {
        borderRadius: theme.spacing(1.625),
      },
    },

    thumb: {
      color: Color.White,
      boxShadow: undefined,
      width: theme.spacing(3),
      height: theme.spacing(3),

      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(2),
        height: theme.spacing(2),
      },
    },

    switchBase: {
      left: theme.spacing(1),
      padding: theme.spacing(1.25, 1),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(1),
      },

      '&$checked': {
        transform: `translateX(${theme.spacing(2.5)}px)`,

        [theme.breakpoints.up('sm')]: {
          transform: `translateX(${theme.spacing(2)}px)`,
        },
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

      '&$checked$disabled + $track': {
        backgroundColor: Color.Blue100,
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
