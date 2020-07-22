import {
  createGenerateClassName,
  createMuiTheme,
  CssBaseline,
  Theme,
} from '@material-ui/core';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import {
  StylesProvider,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/styles';
import { Rule, StyleSheet } from 'jss';
import React, { ReactNode } from 'react';
import { useConstant } from 'utility-hooks';

import { overrideAppBar } from '../app-bar/AppBarOverrides';
import { overrideAutocomplete } from '../autocomplete/AutocompleteOverrides';
import { overrideAvatar } from '../avatar/AvatarOverrides';
import { overrideButton } from '../button/ButtonOverrides';
import { overrideCard } from '../card/CardOverrides';
import { overrideCheckbox } from '../checkbox/CheckboxOverrides';
import { overrideChip } from '../chip/ChipOverrides';
import { overrideDialog } from '../dialog/DialogOverrides';
import { overrideDrawer } from '../drawer/DrawerOverrides';
import { overrideIconButton } from '../icon-button/IconButtonOverrides';
import { overrideLink } from '../link/LinkOverrides';
import { overrideList } from '../list/ListOverrides';
import { overrideMenu } from '../menu/MenuOverrides';
import { overridePaper } from '../paper/PaperOverrides';
import { overrideRadio } from '../radio/RadioOverrides';
import { ResponsiveContextProvider } from '../responsive/ResponsiveContext';
import { overrideSnackbar } from '../snackbar/SnackbarOverrides';
import { SnackbarStackProvider } from '../snackbar/SnackbarStack';
import { overrideSvgIcon } from '../svg-icon/SvgIconOverrides';
import { overrideSwitch } from '../switch/SwitchOverrides';
import { overrideTabs } from '../tabs/TabsOverrides';
import { overrideTextField } from '../text-field/TextFieldOverrides';
import { overrideToolbar } from '../toolbar/ToolbarOverrides';
import { overrideTooltip } from '../tooltip/TooltipOverrides';
import {
  createTypographyOptions,
  overrideTypography,
} from '../typography/TypographyOverrides';
import { Color } from './Color';

export type SuperDispatchTheme = Readonly<Required<Theme>>;

function createTheme() {
  const breakpoints = createBreakpoints({});
  const theme = createMuiTheme({
    breakpoints,

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

    typography: createTypographyOptions(breakpoints),

    props: {},
    overrides: {},
  }) as SuperDispatchTheme;

  overrideAppBar(theme);
  overrideAutocomplete(theme);
  overrideAvatar(theme);
  overrideButton(theme);
  overrideCard(theme);
  overrideCheckbox(theme);
  overrideChip(theme);
  overrideDialog(theme);
  overrideDrawer(theme);
  overrideIconButton(theme);
  overrideLink(theme);
  overrideList(theme);
  overrideMenu(theme);
  overridePaper(theme);
  overrideRadio(theme);
  overrideSnackbar(theme);
  overrideSvgIcon(theme);
  overrideSwitch(theme);
  overrideTabs(theme);
  overrideTextField(theme);
  overrideToolbar(theme);
  overrideTooltip(theme);
  overrideTypography(theme);

  return theme;
}

const generateMaterialClassName = createGenerateClassName();

function generateClassName(rule: Rule, sheet?: StyleSheet) {
  const sheetMeta = sheet?.options.meta;

  return rule.type === 'style' && sheetMeta?.startsWith('SD-')
    ? `${sheetMeta}-${rule.key}`
    : generateMaterialClassName(rule, sheet);
}

export interface ThemeProviderProps {
  children?: ReactNode;
  modifier?: (theme: SuperDispatchTheme) => SuperDispatchTheme;
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

        <ResponsiveContextProvider>
          <SnackbarStackProvider>{children}</SnackbarStackProvider>
        </ResponsiveContextProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  );
}
