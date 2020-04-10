import { SvgIcon, SvgIconProps } from '@material-ui/core';
import React, { forwardRef } from 'react';

import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

const SelectIcon = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props}>
    <path d="M12 16.5L6 9h12l-6 7.5z" fill="currentColor" />
  </SvgIcon>
));

export function overrideTextField(theme: SuperDispatchTheme) {
  const sm = theme.breakpoints.up('sm');

  theme.props.MuiTextField = { rows: 4, rowsMax: 4, variant: 'outlined' };

  theme.overrides.MuiFormLabel = {
    root: {
      ...theme.typography.body2,

      color: Color.Grey400,

      '&$error': { color: undefined },
      '&$focused': { color: undefined },
      '&$disabled': { color: undefined },
    },
  };

  theme.overrides.MuiInputBase = {
    root: {
      ...theme.typography.body2,
      '&$disabled': { backgroundColor: Color.Silver100 },
    },
    input: {
      textOverflow: 'ellipsis',
      height: theme.spacing(3),
      [sm]: { height: theme.spacing(2.5) },
    },
    inputMultiline: { resize: 'vertical' },
  };

  theme.props.MuiInputLabel = { shrink: true };

  theme.overrides.MuiInputLabel = {
    root: { marginBottom: theme.spacing(0.5), transformOrigin: undefined },
    formControl: {
      top: undefined,
      left: undefined,
      position: undefined,
      transform: undefined,
    },
    shrink: { transform: undefined, transformOrigin: undefined },
    outlined: {
      zIndex: undefined,
      transform: undefined,
      pointerEvents: undefined,
      '&$shrink': { transform: undefined },
    },
  };

  theme.props.MuiOutlinedInput = {
    notched: false,
  };

  theme.overrides.MuiOutlinedInput = {
    root: { '&:hover $notchedOutline': { borderColor: undefined } },

    input: {
      padding: theme.spacing(1.25, 1.5),
      [sm]: { padding: theme.spacing(0.75, 1) },
    },

    multiline: { padding: theme.spacing(0.75, 1) },
    adornedStart: { paddingLeft: theme.spacing(1) },
    adornedEnd: { paddingRight: theme.spacing(1) },

    notchedOutline: {
      top: 0,
      borderColor: Color.Silver500,
      '& legend': { display: 'none' },
    },
  };

  theme.props.MuiSelect = {
    IconComponent: SelectIcon,
  };

  theme.overrides.MuiSelect = {
    icon: {
      top: 'calc(50% - 0.5em)',
      '$disabled &': { color: Color.Grey100 },

      fontSize: theme.spacing(3),
      [sm]: { fontSize: theme.spacing(2) },
    },

    iconOutlined: {
      right: theme.spacing(1.5),
      [sm]: { right: theme.spacing(1) },
    },

    selectMenu: {
      '&&': {
        paddingRight: theme.spacing(4.5),
        [sm]: { right: theme.spacing(4) },
      },
    },
  };

  theme.overrides.MuiInputAdornment = {
    root: {
      '& .MuiSvgIcon-root': {
        fontSize: theme.spacing(3),
        [sm]: { fontSize: theme.spacing(2.5) },
      },

      '& .MuiIconButton-root': { padding: theme.spacing(1) },
    },

    positionStart: {
      '& .MuiIconButton-root': {
        marginLeft: theme.spacing(-0.5),
        [sm]: { marginLeft: theme.spacing(-0.75) },
      },
    },

    positionEnd: {
      '& .MuiIconButton-root': {
        marginRight: theme.spacing(-0.5),
        [sm]: { marginRight: theme.spacing(-0.75) },
      },
    },
  };

  theme.overrides.MuiFormHelperText = {
    root: {
      ...theme.typography.body2,
      marginTop: theme.spacing(0.5),
    },

    contained: { marginLeft: undefined, marginRight: undefined },
  };
}
