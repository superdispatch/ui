import {
  createGenerateClassName,
  createMuiTheme,
  CssBaseline,
  Theme,
} from '@material-ui/core';
import {
  StylesProvider,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/styles';
import { Rule, StyleSheet } from 'jss';
import React, { ReactNode } from 'react';
import { useConstant } from 'utility-hooks';

import { applyButtonStyles } from '../button/ButtonStyles';
import { SnackbarStackProvider } from '../snackbar/SnackbarStack';
import { applySnackbarStyles } from '../snackbar/SnackbarStyles';
import { applyCardStyles } from './CardStyles';
import { Color } from './Color';
import { applyFormControlStyles } from './FormControlStyles';
import { applyIconButtonStyles } from './IconButtonStyles';
import { applyLinkStyles } from './LinkStyles';
import { applyMenuStyles } from './MenuStyles';
import { applyPaperStyles } from './PaperStyles';
import { applySvgIconStyles } from './SvgIconStyles';
import { applySwitchStyles } from './SwitchStyles';
import { applyTabsStyles } from './TabsStyles';
import { applyTextFieldStyles } from './TextFieldStyles';
import { applyTooltipStyles } from './TooltipStyles';
import {
  applyTypographyStyles,
  createTypographyOptions,
} from './TypographyStyles';

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

  applyFormControlStyles(theme);
  applyButtonStyles(theme);
  applyCardStyles(theme);
  applyIconButtonStyles(theme);
  applyLinkStyles(theme);
  applyMenuStyles(theme);
  applyPaperStyles(theme);
  applySnackbarStyles(theme);
  applySvgIconStyles(theme);
  applySwitchStyles(theme);
  applyTabsStyles(theme);
  applyTextFieldStyles(theme);
  applyTooltipStyles(theme);
  applyTypographyStyles(theme);

  return theme;
}

const generateMaterialClassName = createGenerateClassName();

function generateClassName(rule: Rule, sheet?: StyleSheet<string>) {
  const sheetMeta = sheet?.options.meta;

  return rule.type === 'style' && sheetMeta?.startsWith('SuperDispatch')
    ? `${sheetMeta}-${rule.key}`
    : generateMaterialClassName(rule, sheet);
}

interface ThemeProviderProps {
  children: ReactNode;
  modifier?: (theme: Theme) => Theme;
}

export function ThemeProvider({ modifier, children }: ThemeProviderProps) {
  const theme = useConstant(() => {
    const nextTheme = createTheme();

    return !modifier ? nextTheme : modifier(nextTheme);
  });

  return (
    <StylesProvider injectFirst={true} generateClassName={generateClassName}>
      <MaterialThemeProvider theme={theme}>
        <CssBaseline />

        <SnackbarStackProvider>{children}</SnackbarStackProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  );
}
