import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { CSSProperties, ThemeProvider as MaterialThemeProvider } from '@material-ui/styles';
import React, { ReactNode, useMemo } from 'react';

import { applyButtonStyles } from '../button/ButtonStyles';
import { Color } from './Color';

const MOBILE_MEDIA = '@media (max-width: 767px)';

function fontFamily(font: string) {
  return `${font}, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif`;
}

function textVariant(
  font: string,
  fontWeight: number,
  fontSize: [string, string],
  lineHeight: [string, string],
): any {
  return {
    fontWeight,
    fontSize: fontSize[0],
    lineHeight: lineHeight[0],
    fontFamily: fontFamily(font),
    [MOBILE_MEDIA]: {
      fontSize: fontSize[1],
      lineHeight: lineHeight[1],
    },
  };
}

function createTheme() {
  const theme = createMuiTheme({
    palette: {
      primary: { main: Color.Blue300 },
      action: { hover: Color.Silver100, selected: Color.Silver400 },
    },

    typography: {
      fontFamily: fontFamily('SF Pro Text'),
      h1: textVariant('SF Pro Display', 700, ['40px', '44px'], ['32px', '34px']),
      h2: textVariant('SF Pro Display', 500, ['24px', '26px'], ['28px', '32px']),
      h3: textVariant('SF Pro Display', 500, ['20px', '22px'], ['28px', '32px']),
      h4: textVariant('SF Pro Text', 500, ['16px', '18px'], ['24px', '28px']),
      h5: textVariant('SF Pro Text', 600, ['14px', '16px'], ['20px', '24px']),
      h6: textVariant('SF Pro Text', 700, ['12px', '13px'], ['16px', '18px']),
      body2: textVariant('SF Pro Text', 400, ['14px', '16px'], ['20px', '24px']),
      body1: textVariant('SF Pro Text', 600, ['14px', '16px'], ['20px', '24px']),
      caption: textVariant('SF Pro Text', 400, ['12px', '13px'], ['16px', '18px']),

      button: { textTransform: 'none' },
    },

    overrides: {
      MuiLink: {
        button: {
          textAlign: 'initial',
        },
      },

      MuiTouchRipple: {
        ripple: { color: Color.Silver80 },
      },

      MuiMenuItem: {
        root: {
          fontSize: '14px',
          lineHeight: '20px',
          paddingTop: '8px',
          paddingBottom: '8px',
        },
      },

      MuiListItem: {
        root: {
          '&$selected, &$selected:hover': {
            color: Color.Blue,
          },
        },
      },

      MuiTabs: {
        root: { minHeight: '40px' },
      },

      MuiTab: {
        root: { minHeight: '40px' },

        wrapper: {
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '20px',

          [MOBILE_MEDIA]: {
            fontSize: '16px',
            lineHeight: '24px',
          },
        },

        textColorPrimary: {
          color: Color.Grey500,
          '&:hover, &:focus': { color: Color.Blue300 },
        },
      },
    },

    props: {
      MuiLink: {
        underline: 'none',
      },

      MuiMenu: {
        keepMounted: true,
        getContentAnchorEl: null,
        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
      },

      MuiMenuItem: { dense: true },

      MuiTabs: { variant: 'scrollable', textColor: 'primary', indicatorColor: 'primary' },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  (theme.overrides!.MuiTab!
    .textColorPrimary as CSSProperties).transition = theme.transitions.create(['color'], {
    duration: theme.transitions.duration.short,
  });

  applyButtonStyles(theme);

  return theme;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useMemo(createTheme, []);

  return (
    <MaterialThemeProvider theme={theme}>
      <CssBaseline />

      {children}
    </MaterialThemeProvider>
  );
}
