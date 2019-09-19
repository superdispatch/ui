import { Theme } from '@material-ui/core';

import { Color } from '../theme/Color';

export function applyTabsStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiTabs = { variant: 'scrollable', textColor: 'primary', indicatorColor: 'primary' };
  theme.overrides.MuiTabs = { root: { minHeight: '40px' } };

  theme.overrides.MuiTab = {
    root: { minHeight: '40px' },

    wrapper: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '20px',

      [theme.breakpoints.down('xs')]: {
        fontSize: '16px',
        lineHeight: '24px',
      },
    },

    textColorPrimary: {
      color: Color.Grey500,
      '&:hover, &:focus': { color: Color.Blue300 },
      transition: theme.transitions.create(['color'], {
        duration: theme.transitions.duration.short,
      }),
    },
  };
}
