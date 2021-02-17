import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

export function createTypographyOptions(
  breakpoints: Breakpoints,
): TypographyOptions {
  const xsOnly = breakpoints.only('xs');

  return {
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    fontFamily: '"Inter", sans-serif',

    h1: {
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: 700,
      [xsOnly]: {
        fontSize: '28px',
        lineHeight: '36px',
      },
    },

    h2: {
      fontSize: '24px',
      lineHeight: '28px',
      fontWeight: 500,
      [xsOnly]: {
        fontSize: '22px',
        lineHeight: '26px',
      },
    },

    h3: {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 500,
      [xsOnly]: {
        fontSize: '20px',
        lineHeight: '26px',
      },
    },

    h4: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 500,
      [xsOnly]: {
        fontSize: '17px',
        lineHeight: '26px',
      },
    },

    h5: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 600,
      [xsOnly]: {
        fontSize: '16px',
        lineHeight: '24px',
      },
    },

    h6: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      [xsOnly]: {
        fontSize: '14px',
        lineHeight: '20px',
      },
    },

    body1: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 600,
      [xsOnly]: {
        fontSize: '16px',
        lineHeight: '24px',
      },
    },

    body2: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
      [xsOnly]: {
        fontSize: '16px',
        lineHeight: '24px',
      },
    },

    caption: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
      [xsOnly]: {
        fontSize: '14px',
        lineHeight: '20px',
      },
    },

    button: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 600,
      textTransform: undefined,
      [xsOnly]: {
        fontSize: '16px',
        lineHeight: '24px',
      },
    },
  };
}

export function overrideTypography(theme: SuperDispatchTheme): void {
  theme.props.MuiTypography = { variant: 'body2' };
}
