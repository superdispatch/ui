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
import { Color } from './Color';
import { applyAppBarStyles } from './styles/AppBarStyles';
import { applyCardStyles } from './styles/CardStyles';
import { applyDialogStyles } from './styles/DialogStyles';
import { applyFormControlStyles } from './styles/FormControlStyles';
import { applyIconButtonStyles } from './styles/IconButtonStyles';
import { applyLinkStyles } from './styles/LinkStyles';
import { applyMenuStyles } from './styles/MenuStyles';
import { applyPaperStyles } from './styles/PaperStyles';
import { applySvgIconStyles } from './styles/SvgIconStyles';
import { applySwitchStyles } from './styles/SwitchStyles';
import { applyTabsStyles } from './styles/TabsStyles';
import { applyTextFieldStyles } from './styles/TextFieldStyles';
import { applyToolbarStyles } from './styles/ToolbarStyles';
import { applyTooltipStyles } from './styles/TooltipStyles';
import {
  applyTypographyStyles,
  createTypographyOptions,
} from './styles/TypographyStyles';

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

    props: {},
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
  }) as Required<Theme>;

  applyAppBarStyles(theme);
  applyCardStyles(theme);
  applyFormControlStyles(theme);
  applyDialogStyles(theme);
  applyIconButtonStyles(theme);
  applyLinkStyles(theme);
  applyMenuStyles(theme);
  applyPaperStyles(theme);
  applySvgIconStyles(theme);
  applySwitchStyles(theme);
  applyTabsStyles(theme);
  applyTextFieldStyles(theme);
  applyToolbarStyles(theme);
  applyTooltipStyles(theme);
  applyTypographyStyles(theme);

  applyButtonStyles(theme);
  applySnackbarStyles(theme);

  return theme;
}

const generateMaterialClassName = createGenerateClassName();

function generateClassName(rule: Rule, sheet?: StyleSheet) {
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
