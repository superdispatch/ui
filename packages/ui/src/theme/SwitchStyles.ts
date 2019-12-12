import { Theme } from '@material-ui/core';

import { Color } from './Color';

export function applySwitchStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiSwitch = { color: 'primary' };

  theme.overrides.MuiSwitch = {
    root: {
      padding: undefined,
      width: theme.spacing(5),
      height: theme.spacing(3),
      margin: theme.spacing(1),
    },

    track: {
      opacity: undefined,
      borderRadius: theme.spacing(1.625),
    },

    thumb: {
      color: Color.White,
      boxShadow: undefined,
      width: theme.spacing(2),
      height: theme.spacing(2),
    },

    switchBase: {
      padding: theme.spacing(0.5),

      '&$checked': {
        transform: `translateX(${theme.spacing(2)}px)`,
      },

      '&$checked + $track': {
        opacity: undefined,
      },
    },

    colorPrimary: {
      '&$checked': {
        color: undefined,
      },

      '&:not($checked) + $track': { backgroundColor: Color.Silver500 },
      '&$checked + $track': {
        backgroundColor: Color.Blue300,

        '&:hover': {
          backgroundColor: Color.Blue400,
        },
      },
    },
  };
}
