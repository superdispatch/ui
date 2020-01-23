import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

export function applyLinkStyles(theme: SuperDispatchTheme) {
  theme.props.MuiLink = { underline: 'none' };

  theme.overrides.MuiLink = {
    root: {
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

    button: {
      border: undefined,
      position: 'static',

      fontSize: 'inherit',
      textAlign: 'inherit',
      lineHeight: 'inherit',
      fontFamily: 'inherit',
      alignItems: 'inherit',
      fontWeight: 'inherit',
      userSelect: 'inherit',
      verticalAlign: 'inherit',
    },
  };
}
