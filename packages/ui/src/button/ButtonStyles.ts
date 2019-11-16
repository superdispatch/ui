import { Theme } from '@material-ui/core';

export function applyButtonStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiButton = {
    disableFocusRipple: true,
  };

  theme.overrides.MuiButton = {
    root: {
      color: undefined,
      textTransform: undefined,
      minWidth: theme.spacing(6),
      transition: theme.transitions.create(['color', 'border', 'box-shadow', 'background-color'], {
        duration: theme.transitions.duration.short,
      }),

      fontSize: 14,
      lineHeight: '20px',
      padding: theme.spacing(0.75, 2),
      [theme.breakpoints.only('xs')]: {
        fontSize: 16,
        lineHeight: '24px',
        padding: theme.spacing(1.25, 3),
      },

      '&:hover': {
        backgroundColor: undefined,
        '&$disabled': { backgroundColor: undefined },
        '@media (hover: none)': { backgroundColor: undefined },
      },

      '&$disabled': { color: undefined },
    },

    label: {
      '& > .MuiSvgIcon-root': {
        fontSize: 20,
        '$sizeLarge &': { fontSize: 24 },
        [theme.breakpoints.only('xs')]: { fontSize: 24 },
      },
    },

    sizeSmall: {
      padding: theme.spacing(0.25, 2),

      [theme.breakpoints.only('xs')]: {
        padding: theme.spacing(0.5, 3),
      },
    },

    sizeLarge: {
      fontSize: 16,
      lineHeight: '24px',
      padding: theme.spacing(1.25, 5),

      [theme.breakpoints.only('xs')]: {
        padding: theme.spacing(2, 8),
      },
    },

    text: { padding: undefined },
    textSizeSmall: { padding: undefined, fontSize: undefined },
    textSizeLarge: { padding: undefined, fontSize: undefined },

    outlined: {
      border: undefined,
      padding: undefined,
      '&$disabled': { border: undefined },
    },

    outlinedPrimary: {
      border: undefined,
      '&:hover': { border: undefined, backgroundColor: undefined },
    },
    outlinedSizeSmall: { padding: undefined, fontSize: undefined },
    outlinedSizeLarge: { padding: undefined, fontSize: undefined },

    contained: {
      color: undefined,
      boxShadow: undefined,
      backgroundColor: undefined,

      '&:hover': {
        boxShadow: undefined,
        backgroundColor: undefined,
        '&$disabled': { backgroundColor: undefined },
        '@media (hover: none)': { boxShadow: undefined, backgroundColor: undefined },
      },
      '&:active': { boxShadow: undefined },
      '&$focusVisible': { boxShadow: undefined },
      '&$disabled': { color: undefined, boxShadow: undefined, backgroundColor: undefined },
    },

    containedSizeSmall: { padding: undefined, fontSize: undefined },
    containedSizeLarge: { padding: undefined, fontSize: undefined },
  };
}
