import { CSSProperties } from '@material-ui/styles';

import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

function outlineShadow(size = 0, color: Color = Color.Transparent) {
  return `0 0 0 ${size}px ${color}`;
}

function textVariant(
  text: Color,
  outline: Color,
  background: Color,
  progress: Color,
): CSSProperties {
  return {
    color: text,
    boxShadow: outlineShadow(),
    '&[aria-busy="true"]': { color: progress },
    '&$disabled:not([aria-busy="true"])': { color: outline },
    '&:not($disabled)': {
      '&:hover, &:active, &[aria-expanded="true"]': {
        backgroundColor: background,
      },
      '&:focus': {
        backgroundColor: background,
        boxShadow: outlineShadow(2, outline),
      },
    },
  };
}

function outlinedBorder(
  borderColor: Color,
  outlineColor: Color = Color.Transparent,
) {
  return `inset 0 0 0 1px ${borderColor}, 0 0 0 2px ${outlineColor}`;
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
    border: undefined,
    boxShadow: outlinedBorder(staleBorder),

    '&:hover': {
      color: activeText,
      border: undefined,
      backgroundColor: activeBackground,
      boxShadow: outlinedBorder(activeBorder),
    },

    '&[aria-expanded="true"]': {
      color: activeText,
      backgroundColor: activeBackground,
      boxShadow: outlinedBorder(activeBorder),
    },

    '&:focus': {
      boxShadow: outlinedBorder(activeBorder, activeOutline),
    },

    '&$disabled': {
      backgroundColor,
      color: disabledText,
      boxShadow: outlinedBorder(disabledBorder),
    },

    '&$disabled[aria-busy="true"]': {
      color: progress,
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
    boxShadow: outlineShadow(),

    '&:hover': {
      backgroundColor: active,
    },

    '&[aria-expanded="true"]': {
      backgroundColor: active,
    },

    '&:focus': {
      boxShadow: outlineShadow(3, outline),
    },

    '&$disabled': {
      color: disabledText,
      boxShadow: outlineShadow(),
      backgroundColor: disabledBackground,
    },
  };
}

export function overrideButton(theme: SuperDispatchTheme) {
  const sm = theme.breakpoints.up('sm');

  theme.props.MuiButton = {
    color: 'primary',
    variant: 'outlined',
    disableFocusRipple: true,
  };

  theme.overrides.MuiButton = {
    root: {
      color: undefined,
      minWidth: theme.spacing(6),

      transition: theme.transitions.create([
        'color',
        'border',
        'box-shadow',
        'background-color',
      ]),

      padding: theme.spacing(1.25, 3),

      [sm]: { padding: theme.spacing(0.75, 2) },

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
            top: 'calc(50% - 0.5em)',
            left: 'calc(50% - 0.5em)',

            fontSize: theme.spacing(2),
            '$sizeLarge &': { fontSize: theme.spacing(3) },
          },
        },
      },
    },

    label: {
      '& > .MuiSvgIcon-root': {
        fontSize: '24px',
        [sm]: { fontSize: '20px' },

        '$sizeLarge &': {
          fontSize: '28px',
          [sm]: { fontSize: '24px' },
        },
      },
    },

    sizeSmall: {
      padding: theme.spacing(0.5, 3),
      [sm]: { padding: theme.spacing(0.25, 2) },
    },

    sizeLarge: {
      fontSize: '18px',
      lineHeight: '28px',
      padding: theme.spacing(1.75, 8),

      [sm]: {
        fontSize: '16px',
        lineHeight: '24px',
        padding: theme.spacing(1, 4),
      },
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

    outlinedPrimary: outlinedVariant(
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

      '&:active': {
        boxShadow: undefined,
      },

      '&$focusVisible': {
        boxShadow: undefined,
      },

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

      '&[data-color="white"]': containedVariant(
        Color.White,
        Color.White20,
        Color.White40,
        Color.White40,
        Color.White50,
        Color.White08,
      ),
    },

    containedPrimary: containedVariant(
      Color.White,
      Color.Blue300,
      Color.Blue100,
      Color.Blue500,
      Color.White,
      Color.Blue100,
    ),

    containedSizeSmall: { padding: undefined, fontSize: undefined },
    containedSizeLarge: { padding: undefined, fontSize: undefined },
  };
}
