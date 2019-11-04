import { createGenerateClassName, createMuiTheme, CssBaseline } from '@material-ui/core';
import { StylesProvider, ThemeProvider as MaterialThemeProvider } from '@material-ui/styles';
import { Rule, StyleSheet } from 'jss';
import React, { ReactNode, useMemo } from 'react';

import { applyButtonStyles } from '../button/ButtonStyles';
import { applyCardStyles } from '../card/CardStyles';
import { applyIconButtonStyles } from '../icon-button/IconButtonStyles';
import { applyLinkStyles } from '../link/LinkStyles';
import { applyMenuStyles } from '../menu/MenuStyles';
import { applyPaperStyles } from '../paper/PaperStyles';
import { SnackbarStackProvider } from '../snackbar/SnackbarStack';
import { applySnackbarStyles } from '../snackbar/SnackbarStyles';
import { applySvgIconStyles } from '../svg-icon/SvgIconStyles';
import { applyTabsStyles } from '../tabs/TabsStyles';
import { applyTextFieldStyles } from '../text-field/TextFieldStyles';
import { applyTooltipStyles } from '../tooltip/TooltipStyles';
import { applyTypographyStyles, createTypographyOptions } from '../typography/TypographyStyles';
import { Color } from './Color';

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
        selected: Color.Silver400,
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
      MuiTouchRipple: {
        ripple: {
          color: Color.Silver100,
        },
      },

      MuiListItem: {
        root: {
          '&$selected, &$selected:hover': {
            color: Color.Blue300,
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
  const sheetMeta = sheet && sheet.options.meta;

  return rule.type === 'style' && sheetMeta && sheetMeta.startsWith('SuperDispatch')
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
