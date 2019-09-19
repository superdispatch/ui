import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/styles';
import React, { ReactNode, useMemo } from 'react';

import { applyButtonStyles } from '../button/ButtonStyles';
import { applyIconButtonStyles } from '../icon-button/IconButtonStyles';
import { applyLinkStyles } from '../link/LinkStyles';
import { applyMenuStyles } from '../menu/MenuStyles';
import { applyTabsStyles } from '../tabs/TabsStyles';
import { applyTypographyStyles, createTypographyOptions } from '../typography/TypographyStyles';
import { Color } from './Color';

function createTheme() {
  const theme = createMuiTheme({
    palette: {
      primary: { main: Color.Blue300 },
      action: { hover: Color.Silver100, selected: Color.Silver400 },
    },

    typography: createTypographyOptions(),

    overrides: {
      MuiTouchRipple: {
        ripple: { color: Color.Silver100 },
      },

      MuiListItem: {
        root: {
          '&$selected, &$selected:hover': { color: Color.Blue300 },
        },
      },
    },
  });

  applyButtonStyles(theme);
  applyIconButtonStyles(theme);
  applyLinkStyles(theme);
  applyMenuStyles(theme);
  applyTabsStyles(theme);
  applyTypographyStyles(theme);

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
