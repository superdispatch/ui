import { Theme } from '@material-ui/core';

import { Color } from './Color';

export function applyTextFieldStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiTextField = {
    rows: 4,
    rowsMax: 4,
    variant: 'outlined',
  };

  theme.overrides.MuiInputBase = {
    inputMultiline: {
      resize: 'vertical',
    },
  };

  theme.props.MuiInputLabel = {
    shrink: true,
  };

  theme.overrides.MuiInputLabel = {
    root: {
      fontSize: '14px',
      lineHeight: '20px',
      marginBottom: theme.spacing(0.5),
      color: Color.Grey400,
    },
    formControl: {
      top: undefined,
      left: undefined,
      position: undefined,
      transform: undefined,
    },
    shrink: { transform: undefined },
    outlined: {
      transform: undefined,
      pointerEvents: undefined,
      '&$shrink': { transform: undefined },
    },
  };

  theme.overrides.MuiFormLabel = {
    root: {
      '&$error': { color: undefined },
      '&$focused': { color: undefined },
      '&$disabled': { color: undefined },
    },
  };

  theme.props.MuiOutlinedInput = {
    notched: false,
  };

  theme.overrides.MuiOutlinedInput = {
    root: {
      '& .MuiInputAdornment-root .MuiSvgIcon-root': {
        fontSize: theme.spacing(3),

        [theme.breakpoints.up('sm')]: {
          fontSize: theme.spacing(2.5),
        },
      },

      '&:hover $notchedOutline': {
        borderColor: Color.Grey100,
      },
    },

    input: {
      fontSize: '14px',
      height: theme.spacing(2.5),
      padding: theme.spacing(0.75, 1),
    },

    multiline: {
      padding: theme.spacing(0.75, 1),
    },

    inputSelect: { paddingRight: theme.spacing(4) },
    adornedStart: { paddingLeft: theme.spacing(1) },
    adornedEnd: { paddingRight: theme.spacing(1) },
  };

  theme.overrides.MuiSelect = {
    icon: {
      fontSize: theme.spacing(3),
    },
    selectMenu: {
      lineHeight: `${theme.spacing(2.5)}px`,
    },
  };

  theme.overrides.MuiFormHelperText = {
    root: {
      fontSize: '14px',
      lineHeight: '20px',
    },

    contained: {
      margin: theme.spacing(0.5, 0, 0, 0),
    },
  };
}
