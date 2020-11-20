import {
  createGenerateClassName,
  createMuiTheme,
  CssBaseline,
} from '@material-ui/core';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import {
  StylesProvider,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/styles';
import { useConstant } from '@superdispatch/hooks';
import { Rule, StyleSheet } from 'jss';
import { ReactElement, ReactNode } from 'react';

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
import { SuperDispatchTheme } from './SuperDispatchTheme';

function createTheme(): SuperDispatchTheme {
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

function generateClassName(rule: Rule, sheet?: StyleSheet): string {
  const { meta, link } = sheet?.options || {};

  if (meta && rule.type === 'style') {
    if (meta.startsWith('SD-')) {
      return `${meta}-${rule.key}`;
    }

    if (meta.startsWith('Mui')) {
      const isPseudoClass = [
        'checked',
        'disabled',
        'error',
        'focused',
        'focusVisible',
        'required',
        'expanded',
        'selected',
      ].includes(rule.key);

      if (isPseudoClass) {
        return `Mui-${rule.key}`;
      }

      if (!link) {
        return `${meta}-${rule.key}`;
      }
    }
  }

  return generateMaterialClassName(rule, sheet);
}

export interface ThemeProviderProps {
  children?: ReactNode;
  injectFirst?: boolean;
  modifier?: (theme: SuperDispatchTheme) => SuperDispatchTheme;
}

export function ThemeProvider({
  modifier,
  children,
  injectFirst = true,
}: ThemeProviderProps): ReactElement {
  const theme = useConstant(() => {
    const nextTheme = createTheme();

    return !modifier ? nextTheme : modifier(nextTheme);
  });

  return (
    <StylesProvider
      injectFirst={injectFirst}
      generateClassName={generateClassName}
    >
      <MaterialThemeProvider theme={theme}>
        <CssBaseline />

        <ResponsiveContextProvider>
          <SnackbarStackProvider>{children}</SnackbarStackProvider>
        </ResponsiveContextProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  );
}
