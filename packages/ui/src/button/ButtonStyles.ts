import { CSSProperties } from '@material-ui/styles/withStyles';

import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';
import { getTypographyProp } from '../typography/TypographyStyles';

function textVariant(
  text: Color,
  outline: Color,
  background: Color,
  progress: Color,
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
  staleText: Color,
  staleBorder: Color,
  disabledText: Color,
  disabledBorder: Color,
  activeText: Color,
  activeBorder: Color,
  activeOutline: Color,
  activeBackground: Color,
  progress: Color,
  backgroundColor: Color,
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
  text: Color,
  backgroundColor: Color,
  outline: Color,
  active: Color,
  disabledText: Color,
  disabledBackground: Color,
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
      minWidth: theme.spacing(6),

      transition: theme.transitions.create(
        ['color', 'border', 'box-shadow', 'background-color'],
        { duration: theme.transitions.duration.short },
      ),

      padding: theme.spacing(1.25, 3),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0.75, 2),
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
      '& > .MuiSvgIcon-root': {
        fontSize: getTypographyProp(theme, 'mobile', 'button', 'lineHeight'),

        [theme.breakpoints.up('sm')]: {
          fontSize: getTypographyProp(theme, 'desktop', 'button', 'lineHeight'),
        },

        '$sizeLarge &': {
          fontSize: getTypographyProp(theme, 'mobile', 'h4', 'lineHeight'),

          [theme.breakpoints.up('sm')]: {
            fontSize: getTypographyProp(theme, 'desktop', 'h4', 'lineHeight'),
          },
        },
      },
    },

    sizeSmall: {
      padding: theme.spacing(0.5, 3),
      [theme.breakpoints.up('sm')]: { padding: theme.spacing(0.25, 2) },
    },

    sizeLarge: {
      ...theme.typography.h4,
      fontWeight: theme.typography.body1.fontWeight,

      padding: theme.spacing(1.75, 8),
      [theme.breakpoints.up('sm')]: { padding: theme.spacing(1, 4) },
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
        Color.White50,
        Color.White10,
        Color.White50,
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
        Color.White50,
        Color.White50,
        Color.White40,
        Color.White,
        Color.White50,
        Color.White40,
        Color.White10,
        Color.White50,
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
        Color.White20,
        Color.White40,
        Color.White40,
        Color.White50,
        Color.White08,
      ),
    },

    containedSizeSmall: { padding: undefined, fontSize: undefined },
    containedSizeLarge: { padding: undefined, fontSize: undefined },
  };
}
