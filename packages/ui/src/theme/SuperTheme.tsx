import React, { useMemo, ReactNode } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { TypographyStyleOptions } from '@material-ui/core/styles/createTypography';
import { SuperColors } from './SuperColors';

const MOBILE_MEDIA = '@media (max-width: 767px)';

function createFontFamily(font: string) {
  return `${font}, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif`;
}

function createTypographyVariant(
  font: string,
  fontWeight: number,
  fontSize: [string, string],
  lineHeight: [string, string],
): TypographyStyleOptions {
  return {
    fontWeight,
    fontSize: fontSize[0],
    lineHeight: lineHeight[0],
    fontFamily: createFontFamily(font),

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
        main: SuperColors.Blue,
      },
    },

    typography: {
      fontFamily: createFontFamily('SF Pro Text'),
      h1: createTypographyVariant('SF Pro Display', 700, ['40px', '44px'], ['32px', '34px']),
      h2: createTypographyVariant('SF Pro Display', 500, ['24px', '26px'], ['28px', '32px']),
      h3: createTypographyVariant('SF Pro Display', 500, ['20px', '22px'], ['28px', '32px']),
      h4: createTypographyVariant('SF Pro Text', 500, ['16px', '18px'], ['24px', '28px']),
      h5: createTypographyVariant('SF Pro Text', 600, ['14px', '16px'], ['20px', '24px']),
      h6: createTypographyVariant('SF Pro Text', 700, ['12px', '13px'], ['16px', '18px']),
      body2: createTypographyVariant('SF Pro Text', 400, ['14px', '16px'], ['20px', '24px']),
      body1: createTypographyVariant('SF Pro Text', 600, ['14px', '16px'], ['20px', '24px']),
      caption: createTypographyVariant('SF Pro Text', 400, ['12px', '13px'], ['16px', '18px']),
    },

    overrides: {},

    props: {
      // Name of the component ⚛️
      MuiButtonBase: {
        // The properties to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
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
