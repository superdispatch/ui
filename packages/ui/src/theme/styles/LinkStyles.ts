import { Theme } from '@material-ui/core';

import { Color } from '../Color';

export function applyLinkStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiLink = { underline: 'none' };

  theme.overrides.MuiLink = {
    root: {
      display: 'inline-block',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: '0.1em solid',

      transition: theme.transitions.create(['color', 'border-color'], {
        duration: theme.transitions.duration.short,
      }),

      '&.MuiTypography-colorPrimary': {
        color: Color.Grey500,
        borderColor: Color.Silver500,

        '&:focus': {
          outline: 'none',
          borderColor: Color.Blue300,
        },

        '&:hover, &:active': {
          color: Color.Blue300,
          borderColor: 'currentColor',
        },
      },
    },

    button: { textAlign: 'initial', border: undefined },
  };
}
