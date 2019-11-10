import { createGenerateClassName, createMuiTheme, CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider as MaterialThemeProvider } from '@material-ui/styles';
import { Rule, StyleSheet } from 'jss';
import React, { ReactNode, useMemo } from 'react';

import { applyButtonStyles } from '../button/ButtonStyles';
import { SnackbarStackProvider } from '../snackbar/SnackbarStack';
import { applySnackbarStyles } from '../snackbar/SnackbarStyles';
import { applyTooltipStyles } from '../tooltip/TooltipStyles';
import { applyCardStyles } from './CardStyles';
import { Color } from './Color';
import { applyIconButtonStyles } from './IconButtonStyles';
import { applyLinkStyles } from './LinkStyles';
import { applyMenuStyles } from './MenuStyles';
import { applyPaperStyles } from './PaperStyles';
import { applySvgIconStyles } from './SvgIconStyles';
import { applyTabsStyles } from './TabsStyles';
import { applyTextFieldStyles } from './TextFieldStyles';
import { applyTypographyStyles, createTypographyOptions } from './TypographyStyles';

function createTheme() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: Color.Blue300,
      },

      error: {
        main: Color.Red300,
      },

      action: {
        hover: Color.Silver100,
        selected: Color.Silver300,
        disabled: Color.Silver400,
      },

      text: {
        primary: Color.Grey500,
        secondary: Color.Grey200,
        hint: Color.Grey100,
        disabled: Color.Grey100,
      },
    },

    typography: createTypographyOptions(),

    overrides: {
      MuiListItem: {
        root: {
          '&$selected, &$selected:hover': {
            backgroundColor: Color.Blue50,
          },

          '& .MuiTouchRipple-root': {
            color: Color.Blue100,
          },
        },
      },
    },
  });

  applyButtonStyles(theme);
  applyCardStyles(theme);
  applyIconButtonStyles(theme);
  applyLinkStyles(theme);
  applyMenuStyles(theme);
  applyPaperStyles(theme);
  applySnackbarStyles(theme);
  applySvgIconStyles(theme);
  applyTabsStyles(theme);
  applyTextFieldStyles(theme);
  applyTooltipStyles(theme);
  applyTypographyStyles(theme);

  return theme;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const generateMaterialClassName = createGenerateClassName();

function generateClassName(rule: Rule, sheet?: StyleSheet<string>) {
  const sheetMeta = sheet?.options.meta;

  return rule.type === 'style' && sheetMeta?.startsWith('SuperDispatch')
    ? `${sheetMeta}-${rule.key}`
    : generateMaterialClassName(rule, sheet);
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useMemo(createTheme, []);

  return (
    <StylesProvider injectFirst={true} generateClassName={generateClassName}>
      <MaterialThemeProvider theme={theme}>
        <CssBaseline />

        <SnackbarStackProvider>{children}</SnackbarStackProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  );
}
