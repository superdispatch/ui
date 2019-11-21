import { Theme } from '@material-ui/core';

import { Color } from './Color';
import { fontHeightVariant, fontSizeVariant } from './TypographyStyles';

export function applyTabsStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiTabs = { variant: 'scrollable', textColor: 'primary', indicatorColor: 'primary' };
  theme.overrides.MuiTabs = { root: { minHeight: '40px' } };

  theme.overrides.MuiTab = {
    root: {
      fontWeight: undefined,
      textTransform: undefined,
      minHeight: theme.spacing(5),

      transition: theme.transitions.create(['color'], {
        duration: theme.transitions.duration.short,
      }),

      fontSize: fontSizeVariant('body1', true),
      lineHeight: fontHeightVariant('body1', true),

      [theme.breakpoints.up('sm')]: {
        fontSize: fontSizeVariant('body1'),
        lineHeight: fontHeightVariant('body1'),
      },
    },

    textColorPrimary: {
      color: Color.Grey500,
      '&:hover, &:focus': { color: Color.Blue300 },
    },
  };
}
