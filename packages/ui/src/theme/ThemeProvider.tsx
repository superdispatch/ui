import React, { useMemo, ReactNode } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { TypographyStyleOptions } from '@material-ui/core/styles/createTypography';
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
): TypographyStyleOptions {
  return {
    fontWeight,
    fontSize: fontSize[0],
    lineHeight: lineHeight[0],
    fontFamily: fontFamily(font),

    [MOBILE_MEDIA]: {
      fontSize: fontSize[1],
      lineHeight: lineHeight[1],
    } as TypographyStyleOptions,
  } as TypographyStyleOptions;
}

function createTheme() {
  return createMuiTheme({
    palette: {
      primary: {
        main: Color.Blue,
      },
      secondary: {
        main: Color.Red,
      },
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

      button: {
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '20px',
        textTransform: 'none',
      },
    },
  });
}

interface SuperThemeProviderProps {
  children: ReactNode;
}

export function SuperThemeProvider({ children }: SuperThemeProviderProps) {
  const theme = useMemo(createTheme, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
}
