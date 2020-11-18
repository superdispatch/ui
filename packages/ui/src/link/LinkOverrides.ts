import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

function line(color: string): string {
  return `linear-gradient(to right, ${color} 0%, ${color} 100%)`;
}

export function overrideLink(theme: SuperDispatchTheme): void {
  theme.props.MuiLink = { underline: 'none', color: 'textPrimary' };

  theme.overrides.MuiLink = {
    root: {
      backgroundSize: '100% 1px',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: '0 100%',
      backgroundColor: Color.Transparent,

      '&:focus': { outline: 'none' },
      '&:hover, &:active': { backgroundImage: line('currentColor') },

      '&.MuiTypography-colorTextPrimary': {
        backgroundImage: line(Color.Silver500),

        '&:focus, &:hover, &:active': {
          color: Color.Blue300,
          backgroundImage: line(Color.Blue300),
        },
      },
    },

    button: {
      // Reset button styles.
      backgroundColor: undefined,

      // Override browser defaults.
      fontSize: 'inherit',
      textAlign: 'inherit',
      lineHeight: 'inherit',
      userSelect: 'inherit',
      verticalAlign: 'inherit',
    },
  };
}
