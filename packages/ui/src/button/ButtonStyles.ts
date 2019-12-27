import { CSSProperties } from '@material-ui/styles/withStyles';

import { Color } from '../theme/Color';
import {
  fontHeightVariant,
  fontSizeVariant,
} from '../theme/styles/TypographyStyles';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

function textVariant(
  text: Color,
  outline: Color,
  background: Color,
): CSSProperties {
  return {
    color: text,
    boxShadow: `0 0 0 0 ${outline}`,
    '&$disabled[aria-busy="false"]': { color: outline },
    '&:not($disabled)': {
      '&:hover, &:active, &[aria-expanded="true"]': {
        backgroundColor: background,
      },
      '&:focus': {
        backgroundColor: background,
        boxShadow: `0 0 0 2px ${outline}`,
      },
    },
  };
}

function outlinedVariant(
  staleText: Color,
  staleBorder: Color,
  disabledText: Color,
  disabledBorder: Color,
  activeText: Color,
  activeOutline: Color,
  activeBackground: Color,
  progress: Color,
): CSSProperties {
  return {
    color: staleText,
    boxShadow: `inset 0 0 0 1px ${staleBorder}, 0 0 0 0 ${activeOutline}`,

    '&$disabled[aria-busy="false"]': {
      color: disabledText,
      boxShadow: `inset 0 0 0 1px ${disabledBorder}, 0 0 0 0 ${activeOutline}`,
    },

    '&:not($disabled)': {
      '&:hover, &:active, &[aria-expanded="true"]': {
        color: activeText,
        backgroundColor: activeBackground,
        boxShadow: `inset 0 0 0 1px ${activeText}, 0 0 0 0 ${activeOutline}`,
      },
      '&:focus': {
        boxShadow: `inset 0 0 0 1px ${activeText}, 0 0 0 2px ${activeOutline}`,
      },
    },

    '&[aria-busy="true"] $label > [role="progressbar"]': { color: progress },
  };
}

function containedVariant(
  stale: Color,
  outline: Color,
  active: Color,
): CSSProperties {
  return {
    backgroundColor: stale,
    '&$disabled': { backgroundColor: outline },
    '&:not($disabled)': {
      '&:focus': { boxShadow: `0 0 0 3px ${outline}` },
      '&:hover, &:active, &[aria-expanded="true"]': { backgroundColor: active },
    },
  };
}

export function applyButtonStyles(theme: SuperDispatchTheme) {
  theme.props.MuiButton = {
    disableFocusRipple: true,
  };

  theme.overrides.MuiButton = {
    root: {
      color: undefined,
      textTransform: undefined,
      minWidth: theme.spacing(6),

      transition: theme.transitions.create(
        ['color', 'border', 'box-shadow', 'background-color'],
        {
          duration: theme.transitions.duration.short,
        },
      ),

      fontSize: fontSizeVariant('button'),
      lineHeight: fontHeightVariant('button'),
      padding: theme.spacing(0.75, 2),
      [theme.breakpoints.only('xs')]: {
        padding: theme.spacing(1.25, 3),
        fontSize: fontSizeVariant('button', true),
        lineHeight: fontHeightVariant('button', true),
      },

      '&:hover': {
        backgroundColor: undefined,
        '&$disabled': { backgroundColor: undefined },
        '@media (hover: none)': { backgroundColor: undefined },
      },

      '&$disabled': { color: undefined },

      '&[aria-busy="true"]': {
        '& $label': {
          visibility: 'hidden',

          '& > [role="progressbar"]': {
            position: 'absolute',
            visibility: 'visible',
            fontSize: theme.spacing(2),
            top: `calc(50% - ${theme.spacing(1)}px)`,
            left: `calc(50% - ${theme.spacing(1)}px)`,

            '$sizeLarge &': {
              fontSize: theme.spacing(3),
              top: `calc(50% - ${theme.spacing(1.5)}px)`,
              left: `calc(50% - ${theme.spacing(1.5)}px)`,
            },
          },
        },
      },
    },

    label: {
      '& > svg': {
        fontSize: fontHeightVariant('button'),
        '$sizeLarge &': { fontSize: fontHeightVariant('h4') },
        [theme.breakpoints.only('xs')]: { fontSize: fontHeightVariant('h4') },
      },
    },

    sizeSmall: {
      padding: theme.spacing(0.25, 2),
      [theme.breakpoints.only('xs')]: { padding: theme.spacing(0.5, 3) },
    },

    sizeLarge: {
      fontSize: fontSizeVariant('h4'),
      lineHeight: fontHeightVariant('h4'),

      padding: theme.spacing(1.25, 5),
      [theme.breakpoints.only('xs')]: { padding: theme.spacing(2, 8) },
    },

    text: {
      padding: undefined,
      '&[data-color="error"]': textVariant(
        Color.Red300,
        Color.Red100,
        Color.Red50,
      ),
      '&[data-color="success"]': textVariant(
        Color.Green300,
        Color.Green100,
        Color.Green50,
      ),
      '&[data-color="primary"]': textVariant(
        Color.Blue300,
        Color.Blue100,
        Color.Blue50,
      ),
    },
    textSizeSmall: { padding: undefined, fontSize: undefined },
    textSizeLarge: { padding: undefined, fontSize: undefined },

    outlined: {
      border: undefined,
      padding: undefined,
      backgroundColor: Color.White,
      '&$disabled': { border: undefined },

      '&[data-color="error"]': outlinedVariant(
        Color.Red300,
        Color.Red300,
        Color.Red100,
        Color.Red100,
        Color.Red300,
        Color.Red100,
        Color.Red50,
        Color.Red300,
      ),
      '&[data-color="success"]': outlinedVariant(
        Color.Green300,
        Color.Green300,
        Color.Green100,
        Color.Green100,
        Color.Green300,
        Color.Green100,
        Color.Green50,
        Color.Green300,
      ),
      '&[data-color="primary"]': outlinedVariant(
        Color.Grey500,
        Color.Silver500,
        Color.Silver500,
        Color.Silver400,
        Color.Blue300,
        Color.Blue100,
        Color.Blue50,
        Color.Grey200,
      ),
    },

    outlinedPrimary: {
      border: undefined,
      '&:hover': { border: undefined, backgroundColor: undefined },
    },
    outlinedSizeSmall: { padding: undefined, fontSize: undefined },
    outlinedSizeLarge: { padding: undefined, fontSize: undefined },

    contained: {
      color: Color.White,
      boxShadow: undefined,
      backgroundColor: undefined,

      '&:hover': {
        boxShadow: undefined,
        backgroundColor: undefined,
        '&$disabled': { backgroundColor: undefined },
        '@media (hover: none)': {
          boxShadow: undefined,
          backgroundColor: undefined,
        },
      },
      '&:active': { boxShadow: undefined },
      '&$focusVisible': { boxShadow: undefined },
      '&$disabled': {
        color: undefined,
        boxShadow: undefined,
        backgroundColor: undefined,
      },

      '&[data-color="error"]': containedVariant(
        Color.Red300,
        Color.Red100,
        Color.Red500,
      ),
      '&[data-color="success"]': containedVariant(
        Color.Green300,
        Color.Green100,
        Color.Green500,
      ),
      '&[data-color="primary"]': containedVariant(
        Color.Blue300,
        Color.Blue100,
        Color.Blue500,
      ),
    },

    containedSizeSmall: { padding: undefined, fontSize: undefined },
    containedSizeLarge: { padding: undefined, fontSize: undefined },
  };
}
