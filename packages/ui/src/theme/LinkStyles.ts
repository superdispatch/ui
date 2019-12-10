import { Theme } from '@material-ui/core';

import { Color } from './Color';

export function applyLinkStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiLink = { underline: 'always' };

  theme.overrides.MuiLink = {
    root: {
      '&.MuiTypography-colorPrimary': {
        color: Color.Grey500,
        textDecorationColor: Color.Silver500,
        transition: theme.transitions.create(
          ['color', 'text-decoration-color'],
          { duration: theme.transitions.duration.short },
        ),

        '&:focus': {
          outline: 'none',
          textDecorationColor: Color.Blue300,
        },

        '&:hover, &:active': {
          color: Color.Blue300,
          textDecorationColor: 'currentColor',
        },
      },
    },

    button: { textAlign: 'initial' },
  };
}
