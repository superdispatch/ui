import { iconSizeVariant } from '../svg-icon/SvgIconStyles';
import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';
import { getTypographyProp } from '../typography/TypographyStyles';

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
    root: { '&$disabled': { backgroundColor: Color.Silver100 } },
    inputMultiline: { resize: 'vertical' },
  };

  theme.props.MuiInputLabel = { shrink: true };

  theme.overrides.MuiInputLabel = {
    root: { marginBottom: theme.spacing(0.5) },
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

  theme.props.MuiOutlinedInput = {
    notched: false,
  };

  theme.overrides.MuiOutlinedInput = {
    root: {
      '& .MuiInputAdornment-root': {
        '& > .MuiSvgIcon-root': {
          fontSize: getTypographyProp(theme, 'mobile', 'body2', 'lineHeight'),

          [theme.breakpoints.up('sm')]: {
            fontSize: getTypographyProp(theme, 'mobile', 'body2', 'lineHeight'),
          },
        },

        '&.MuiInputAdornment-positionStart': {
          '& > .MuiIconButton-root': {
            padding: theme.spacing(1),
            marginLeft: theme.spacing(-0.5),
          },
        },

        '&.MuiInputAdornment-positionEnd': {
          '& > .MuiIconButton-root': {
            padding: theme.spacing(1),
            marginRight: theme.spacing(-0.5),
          },
        },
      },

      '&:hover $notchedOutline': { borderColor: Color.Grey100 },
    },

    input: {
      ...theme.typography.body2,
      padding: theme.spacing(1.25, 2),
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

  theme.overrides.MuiSelect = {
    icon: {
      fontSize: iconSizeVariant('default'),
      '$disabled &': { color: Color.Grey100 },
    },

    iconOutlined: { right: theme.spacing(0.5) },

    selectMenu: {
      '&&': { paddingRight: theme.spacing(3.5) },
    },
  };

  theme.overrides.MuiFormHelperText = {
    root: { ...theme.typography.body2 },

    contained: { margin: theme.spacing(0.5, 0, 0, 0) },
  };
}
