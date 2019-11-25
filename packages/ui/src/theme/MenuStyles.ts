import { Theme } from '@material-ui/core';

import { fontHeightVariant, fontSizeVariant } from './TypographyStyles';

export function applyMenuStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiMenu = {
    keepMounted: true,
    getContentAnchorEl: null,
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    transformOrigin: { vertical: 'top', horizontal: 'left' },
  };

  theme.overrides.MuiMenuItem = {
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),

      fontSize: fontSizeVariant('body1', true),
      lineHeight: fontHeightVariant('body1', true),

      [theme.breakpoints.up('sm')]: {
        fontSize: fontSizeVariant('body1'),
        lineHeight: fontHeightVariant('body1'),
      },
    },
  };
}
