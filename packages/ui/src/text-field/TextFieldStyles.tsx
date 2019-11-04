import { Theme } from '@material-ui/core';

import { Color } from '../theme/Color';

export function applyTextFieldStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiTextField = {
    rows: 4,
    rowsMax: 4,
    variant: 'outlined',
  };

  theme.props.MuiInputLabel = {
    shrink: true,
  };

  theme.overrides.MuiInputLabel = {
    root: {
      fontSize: '14px',
      lineHeight: '20px',
      marginBottom: '4px',
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
    input: {
      height: '20px',
      fontSize: '14px',
      padding: '6px 8px',
    },

    multiline: {
      padding: '6px 8px',
    },

    inputSelect: {
      paddingRight: theme.spacing(4),
    },
  };

  theme.overrides.MuiSelect = {
    icon: {
      fontSize: '24px',
    },
  };

  theme.overrides.MuiFormHelperText = {
    root: {
      fontSize: '14px',
    },

    contained: {
      margin: '4px 0 0 0',
    },
  };
}
