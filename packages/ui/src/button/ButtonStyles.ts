import { Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';

import { Color } from '../theme/Color';

export enum ButtonClassNames {
  root = 'Button-root',
  isActive = 'Button-isActive',
  isLoading = 'Button-isLoading',
  colorError = 'Button-colorError',
  colorSuccess = 'Button-colorSuccess',
  progress = 'Button-progress',
}

function outlinedColorVariant(
  activeColor: Color,
  activeShadowColor: Color,
  activeBackgroundColor: Color,
  staleColor: Color = activeColor,
  staleBorderColor: Color = activeColor,
): CSSProperties {
  return {
    [`&.${ButtonClassNames.isLoading}`]: { borderColor: staleBorderColor },

    [`& .${ButtonClassNames.progress}`]: { color: activeColor },

    '&:not($disabled)': {
      color: staleColor,
      borderColor: staleBorderColor,

      [`&.${ButtonClassNames.isActive}, &:hover, &:active, &:focus`]: { color: activeColor },
      [`&.${ButtonClassNames.isActive}, &:hover, &:active`]: {
        borderColor: activeColor,
        backgroundColor: activeBackgroundColor,
      },

      '&:focus': { boxShadow: `0 0 0 2px ${activeShadowColor}` },
    },
  };
}

function containedColorVariant(
  backgroundColor: Color,
  boxShadowColor: Color,
  hoverBackgroundColor: Color,
): CSSProperties {
  return {
    [`&.${ButtonClassNames.isLoading}`]: { backgroundColor },

    '&:not($disabled)': {
      backgroundColor,
      color: Color.White,
      '&:focus': { boxShadow: `0 0 0 3px ${boxShadowColor}` },
      [`&.${ButtonClassNames.isActive}, &:hover`]: { backgroundColor: hoverBackgroundColor },
    },
  };
}

const DEFAULT_PROGRESS_SIZE = 16;
const LARGE_PROGRESS_SIZE = 24;

export function applyButtonStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiButton = { disableFocusRipple: true };

  theme.overrides.MuiButton = {
    root: {
      fontSize: '14px',
      lineHeight: '20px',
      textTransform: undefined,
      transition: theme.transitions.create(['color', 'border', 'box-shadow', 'background-color'], {
        duration: theme.transitions.duration.short,
      }),

      '&$disabled': { color: undefined },

      [`& .${ButtonClassNames.progress}`]: {
        top: '50%',
        left: '50%',
        position: 'absolute',

        marginTop: -(DEFAULT_PROGRESS_SIZE / 2),
        marginLeft: -(DEFAULT_PROGRESS_SIZE / 2),
        width: `${DEFAULT_PROGRESS_SIZE}px !important`,
        height: `${DEFAULT_PROGRESS_SIZE}px !important`,
      },
    },

    sizeSmall: {
      fontSize: '14px',
      lineHeight: '20px',

      '&$outlined': { padding: '1px 15px' },
      '&$contained': { padding: '2px 16px' },
    },

    sizeLarge: {
      fontSize: '16px',
      lineHeight: '24px',

      '&$outlined': { padding: '9px 39px' },
      '&$contained': { padding: '10px 40px' },

      [`& .${ButtonClassNames.progress}`]: {
        marginTop: -(LARGE_PROGRESS_SIZE / 2),
        marginLeft: -(LARGE_PROGRESS_SIZE / 2),
        width: `${LARGE_PROGRESS_SIZE}px !important`,
        height: `${LARGE_PROGRESS_SIZE}px !important`,
      },
    },

    outlined: {
      padding: '5px 15px',
      backgroundColor: Color.White,
      border: '1px solid transparent',

      '&$disabled': { color: Color.Silver500, borderColor: Color.Silver400 },

      [`&.${ButtonClassNames.colorError}`]: outlinedColorVariant(
        Color.Red300,
        Color.Red100,
        Color.Red50,
      ),

      [`&.${ButtonClassNames.colorSuccess}`]: outlinedColorVariant(
        Color.Green300,
        Color.Green100,
        Color.Green50,
      ),
    },

    outlinedPrimary: outlinedColorVariant(
      Color.Blue300,
      Color.Blue100,
      Color.Blue50,
      Color.Grey500,
      Color.Silver500,
    ),

    contained: {
      color: Color.White,
      padding: '6px 16px',
      boxShadow: '0 0 0 0 transparent',
      '&:active': { boxShadow: undefined },
      '&$disabled': { color: Color.Silver500, backgroundColor: Color.Silver200 },

      [`&.${ButtonClassNames.colorError}`]: containedColorVariant(
        Color.Red300,
        Color.Red100,
        Color.Red500,
      ),

      [`&.${ButtonClassNames.colorSuccess}`]: containedColorVariant(
        Color.Green300,
        Color.Green100,
        Color.Green500,
      ),

      [`& .${ButtonClassNames.progress}`]: { color: Color.White },
    },

    containedPrimary: containedColorVariant(Color.Blue300, Color.Blue100, Color.Blue500),

    disabled: {
      boxShadow: 'none',
      [`&.${ButtonClassNames.isLoading}`]: { color: 'transparent' },
    },
  };
}
