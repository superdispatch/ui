import { createMuiTheme, CssBaseline, useMediaQuery } from '@material-ui/core';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import React, { ReactNode, useMemo } from 'react';

import { applyButtonStyles } from '../button/ButtonStyles';
import { applyIconButtonStyles } from '../icon-button/IconButtonStyles';
import { applyLinkStyles } from '../link/LinkStyles';
import { applyMenuStyles } from '../menu/MenuStyles';
import { applySnackbarStyles } from '../snackbar/SnackbarStyles';
import { applyTabsStyles } from '../tabs/TabsStyles';
import { applyTooltipStyles } from '../tooltip/TooltipStyles';
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
  applySnackbarStyles(theme);
  applyTabsStyles(theme);
  applyTooltipStyles(theme);
  applyTypographyStyles(theme);

  return theme;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useMemo(createTheme, []);
  const snackbarOrigin: SnackbarOrigin = useMemo(
    () => ({ vertical: 'top', horizontal: 'right' }),
    [],
  );
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <MaterialThemeProvider theme={theme}>
      <CssBaseline />

      <SnackbarProvider maxSnack={isDesktop ? 3 : 1} anchorOrigin={snackbarOrigin}>
        {children}
      </SnackbarProvider>
    </MaterialThemeProvider>
  );
}
