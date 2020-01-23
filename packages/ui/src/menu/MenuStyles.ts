import { SuperDispatchTheme } from '../theme/ThemeProvider';
import {
  fontHeightVariant,
  fontSizeVariant,
} from '../typography/TypographyStyles';

export function applyMenuStyles(theme: SuperDispatchTheme) {
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

      fontSize: fontSizeVariant('body1', 'mobile'),
      lineHeight: fontHeightVariant('body1', 'mobile'),

      [theme.breakpoints.up('sm')]: {
        fontSize: fontSizeVariant('body1', 'desktop'),
        lineHeight: fontHeightVariant('body1', 'desktop'),
      },
    },
  };
}
