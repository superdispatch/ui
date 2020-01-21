import { fade } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles/withStyles';

import { Color } from '../theme/Color';
import {
  fontHeightVariant,
  fontSizeVariant,
} from '../theme/styles/TypographyStyles';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

function textVariant(
  text: Color,
  outline: Color | string,
  background: Color | string,
  progress: Color | string,
): CSSProperties {
  return {
    color: text,
    boxShadow: `0 0 0 0 ${outline}`,
    '&[aria-busy="true"]': { color: progress },
    '&$disabled:not([aria-busy="true"])': { color: outline },
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
  staleText: Color | string,
  staleBorder: Color | string,
  disabledText: Color | string,
  disabledBorder: Color | string,
  activeText: Color | string,
  activeBorder: Color | string,
  activeOutline: Color | string,
  activeBackground: Color | string,
  progress: Color | string,
  backgroundColor: Color | string,
): CSSProperties {
  return {
    backgroundColor,
    color: staleText,
    boxShadow: `inset 0 0 0 1px ${staleBorder}, 0 0 0 0 ${activeOutline}`,

    '&[aria-busy="true"]': {
      color: progress,
      boxShadow: `inset 0 0 0 1px ${disabledBorder}, 0 0 0 0 ${activeOutline}`,
    },

    '&$disabled:not([aria-busy="true"])': {
      color: disabledText,
      boxShadow: `inset 0 0 0 1px ${disabledBorder}, 0 0 0 0 ${activeOutline}`,
    },

    '&:not($disabled)': {
      '&:hover, &:active, &[aria-expanded="true"]': {
        color: activeText,
        backgroundColor: activeBackground,
        boxShadow: `inset 0 0 0 1px ${activeBorder}, 0 0 0 0 ${activeOutline}`,
      },
      '&:focus': {
        boxShadow: `inset 0 0 0 1px ${activeBorder}, 0 0 0 2px ${activeOutline}`,
      },
    },
  };
}

function containedVariant(
  text: Color | string,
  backgroundColor: Color | string,
  outline: Color | string,
  active: Color | string,
  disabledText: Color | string,
  disabledBackground: Color | string,
): CSSProperties {
  return {
    color: text,
    backgroundColor,
    '&$disabled': {
      backgroundColor: disabledBackground,
      color: disabledText,
    },
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
        Color.Red200,
      ),
      '&[data-color="success"]': textVariant(
        Color.Green300,
        Color.Green100,
        Color.Green50,
        Color.Green200,
      ),
      '&[data-color="primary"]': textVariant(
        Color.Blue300,
        Color.Blue100,
        Color.Blue50,
        Color.Blue200,
      ),
      '&[data-color="white"]': textVariant(
        Color.White,
        fade(Color.White, 0.5),
        fade(Color.White, 0.1),
        fade(Color.White, 0.5),
      ),
    },
    textSizeSmall: { padding: undefined, fontSize: undefined },
    textSizeLarge: { padding: undefined, fontSize: undefined },

    outlined: {
      border: undefined,
      padding: undefined,
      '&$disabled': { border: undefined },

      '&[data-color="error"]': outlinedVariant(
        Color.Red300,
        Color.Red300,
        Color.Red100,
        Color.Red100,
        Color.Red300,
        Color.Red300,
        Color.Red100,
        Color.Red50,
        Color.Red300,
        Color.White,
      ),
      '&[data-color="success"]': outlinedVariant(
        Color.Green300,
        Color.Green300,
        Color.Green100,
        Color.Green100,
        Color.Green300,
        Color.Green300,
        Color.Green100,
        Color.Green50,
        Color.Green300,
        Color.White,
      ),
      '&[data-color="primary"]': outlinedVariant(
        Color.Grey500,
        Color.Silver500,
        Color.Silver500,
        Color.Silver400,
        Color.Blue300,
        Color.Blue300,
        Color.Blue100,
        Color.Blue50,
        Color.Grey200,
        Color.White,
      ),
      '&[data-color="white"]': outlinedVariant(
        Color.White,
        fade(Color.White, 0.6),
        fade(Color.White, 0.5),
        fade(Color.White, 0.35),
        Color.White,
        fade(Color.White, 0.6),
        fade(Color.White, 0.4),
        fade(Color.White, 0.1),
        fade(Color.White, 0.5),
        Color.Transparent,
      ),
    },

    outlinedPrimary: {
      border: undefined,
      '&:hover': { border: undefined, backgroundColor: undefined },
    },
    outlinedSizeSmall: { padding: undefined, fontSize: undefined },
    outlinedSizeLarge: { padding: undefined, fontSize: undefined },

    contained: {
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
        Color.White,
        Color.Red300,
        Color.Red100,
        Color.Red500,
        Color.White,
        Color.Red100,
      ),
      '&[data-color="success"]': containedVariant(
        Color.White,
        Color.Green300,
        Color.Green100,
        Color.Green500,
        Color.White,
        Color.Green100,
      ),
      '&[data-color="primary"]': containedVariant(
        Color.White,
        Color.Blue300,
        Color.Blue100,
        Color.Blue500,
        Color.White,
        Color.Blue100,
      ),
      '&[data-color="white"]': containedVariant(
        Color.White,
        fade(Color.White, 0.2),
        fade(Color.White, 0.4),
        fade(Color.White, 0.4),
        fade(Color.White, 0.5),
        fade(Color.White, 0.08),
      ),
    },

    containedSizeSmall: { padding: undefined, fontSize: undefined },
    containedSizeLarge: { padding: undefined, fontSize: undefined },
  };
}
