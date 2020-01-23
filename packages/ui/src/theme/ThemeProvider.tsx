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
import React, { ReactElement, ReactNode } from 'react';
import { useConstant } from 'utility-hooks';

import { applyAppBarStyles } from '../app-bar/AppBarStyles';
import { applyButtonStyles } from '../button/ButtonStyles';
import { applyCardStyles } from '../card/CardStyles';
import { applyCheckboxStyles } from '../checkbox/CheckboxStyles';
import { applyDialogStyles } from '../dialog/DialogStyles';
import { applyIconButtonStyles } from '../icon-button/IconButtonStyles';
import { applyLinkStyles } from '../link/LinkStyles';
import { applyListStyles } from '../list/ListStyles';
import { applyMenuStyles } from '../menu/MenuStyles';
import { applyPaperStyles } from '../paper/PaperStyles';
import { applyRadioStyles } from '../radio/RadioStyles';
import { SnackbarStackProvider } from '../snackbar/SnackbarStack';
import { applySnackbarStyles } from '../snackbar/SnackbarStyles';
import { applySvgIconStyles } from '../svg-icon/SvgIconStyles';
import { applySwitchStyles } from '../switch/SwitchStyles';
import { applyTabsStyles } from '../tabs/TabsStyles';
import { applyTextFieldStyles } from '../text-field/TextFieldStyles';
import { applyToolbarStyles } from '../toolbar/ToolbarStyles';
import { applyTooltipStyles } from '../tooltip/TooltipStyles';
import {
  applyTypographyStyles,
  createTypographyOptions,
} from '../typography/TypographyStyles';
import { Color } from './Color';

export type SuperDispatchTheme = Readonly<Required<Theme>>;

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
    overrides: {},
  }) as SuperDispatchTheme;

  applyAppBarStyles(theme);
  applyCardStyles(theme);
  applyCheckboxStyles(theme);
  applyDialogStyles(theme);
  applyIconButtonStyles(theme);
  applyListStyles(theme);
  applyLinkStyles(theme);
  applyMenuStyles(theme);
  applyPaperStyles(theme);
  applyRadioStyles(theme);
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

export interface ThemeProviderProps {
  children: ReactNode;
  modifier?: (theme: SuperDispatchTheme) => SuperDispatchTheme;
}

export function ThemeProvider({
  modifier,
  children,
}: ThemeProviderProps): ReactElement {
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
