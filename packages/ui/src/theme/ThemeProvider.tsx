import {
  createGenerateClassName,
  createMuiTheme,
  CssBaseline,
  SvgIcon,
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
import { applyChipStyles } from '../chip/ChipStyle';
import { applyDialogStyles } from '../dialog/DialogStyles';
import { applyDrawerStyles } from '../drawer/DrawerStyles';
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
  getTypographyProp,
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

  // Implement Typography changes first.
  applyTypographyStyles(theme);

  applyAppBarStyles(theme);
  applyButtonStyles(theme);
  applyCardStyles(theme);
  applyCheckboxStyles(theme);
  applyDialogStyles(theme);
  applyDrawerStyles(theme);
  applyIconButtonStyles(theme);
  applyListStyles(theme);
  applyLinkStyles(theme);
  applyMenuStyles(theme);
  applyPaperStyles(theme);
  applyRadioStyles(theme);
  applySnackbarStyles(theme);
  applySvgIconStyles(theme);
  applySwitchStyles(theme);
  applyTabsStyles(theme);
  applyTextFieldStyles(theme);
  applyToolbarStyles(theme);
  applyTooltipStyles(theme);
  applyChipStyles(theme);

  // TODO: Move to `AutocompleteStyles` after official release.
  Object.assign(theme.props, {
    MuiAutocomplete: {
      closeIcon: (
        <SvgIcon>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.239 12L17 8.239 15.761 7 12 10.761 8.239 7 7 8.239 10.761 12 7 15.761 8.239 17 12 13.239 15.761 17 17 15.761 13.239 12z"
            fill="currentColor"
          />
        </SvgIcon>
      ),
    },
  });
  Object.assign(theme.overrides, {
    MuiAutocomplete: {
      paper: { ...theme.typography.body2 },
      tag: {
        margin: theme.spacing(0.5),

        [theme.breakpoints.up('sm')]: {
          margin: theme.spacing(0.25),
        },
      },
      endAdornment: {
        top: 'calc(50% - 16px)',

        [theme.breakpoints.up('sm')]: {
          top: 'calc(50% - 14px)',
        },
      },
      popupIndicator: {
        '& .MuiSvgIcon-root': {
          fontSize: getTypographyProp(theme, 'mobile', 'body2', 'lineHeight'),
        },
      },
      clearIndicator: {
        '& .MuiSvgIcon-root': {
          fontSize: getTypographyProp(theme, 'mobile', 'body2', 'lineHeight'),

          [theme.breakpoints.up('sm')]: {
            fontSize: theme.spacing(2),
          },
        },
      },
      inputRoot: {
        '&[class*="MuiOutlinedInput-root"]': {
          padding: undefined,
          paddingLeft: theme.spacing(1.5),

          [theme.breakpoints.up('sm')]: {
            paddingLeft: 6,
          },

          '& $input': {
            padding: undefined,
            minWidth: theme.spacing(12),
          },
        },
      },
    },
  });

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
