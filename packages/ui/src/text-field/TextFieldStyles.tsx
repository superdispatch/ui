import { SvgIcon, SvgIconProps } from '@material-ui/core';
import React, { forwardRef } from 'react';

import { iconSizeVariant } from '../svg-icon/SvgIconStyles';
import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';
import { getTypographyProp } from '../typography/TypographyStyles';

const SelectIcon = forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
  <SvgIcon ref={ref} {...props}>
    <path d="M12 16.5L6 9h12l-6 7.5z" fill="currentColor" />
  </SvgIcon>
));

export function applyTextFieldStyles(theme: SuperDispatchTheme) {
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
    input: { textOverflow: 'ellipsis' },
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
    root: {
      '&:hover $notchedOutline': { borderColor: Color.Grey100 },
    },

    input: {
      ...theme.typography.body2,
      padding: theme.spacing(1.25, 1.5),
      height: getTypographyProp(theme, 'mobile', 'body2', 'lineHeight'),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0.75, 1),
        height: getTypographyProp(theme, 'desktop', 'body2', 'lineHeight'),
      },
    },

    multiline: { padding: theme.spacing(0.75, 1) },
    adornedStart: { paddingLeft: theme.spacing(1) },
    adornedEnd: { paddingRight: theme.spacing(1) },
  };

  theme.props.MuiSelect = {
    IconComponent: SelectIcon,
  };

  theme.overrides.MuiSelect = {
    icon: {
      top: `calc(50% - ${iconSizeVariant('small', true)} / 2)`,
      fontSize: iconSizeVariant('small', true),
      '$disabled &': { color: Color.Grey100 },

      [theme.breakpoints.up('sm')]: {
        top: `calc(50% - ${iconSizeVariant('small')} / 2)`,
        fontSize: iconSizeVariant('small'),
      },
    },

    iconOutlined: {
      right: theme.spacing(1.5),

      [theme.breakpoints.up('sm')]: {
        right: theme.spacing(1),
      },
    },

    selectMenu: {
      '&&': {
        paddingRight: theme.spacing(4.5),

        [theme.breakpoints.up('sm')]: {
          right: theme.spacing(4),
        },
      },
    },
  };

  theme.overrides.MuiInputAdornment = {
    root: {
      '& .MuiSvgIcon-root': {
        fontSize: getTypographyProp(theme, 'mobile', 'body2', 'lineHeight'),

        [theme.breakpoints.up('sm')]: {
          fontSize: getTypographyProp(theme, 'desktop', 'body2', 'lineHeight'),
        },
      },

      '& .MuiIconButton-root': { padding: theme.spacing(1) },
    },

    positionStart: {
      '& .MuiIconButton-root': {
        marginLeft: theme.spacing(-0.5),

        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(-0.75),
        },
      },
    },

    positionEnd: {
      '& .MuiIconButton-root': {
        marginRight: theme.spacing(-0.5),

        [theme.breakpoints.up('sm')]: {
          marginRight: theme.spacing(-0.75),
        },
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
