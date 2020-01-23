import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';
import { fontHeightVariant, fontSizeVariant } from '../typography/TypographyStyles';

export function applyTabsStyles(theme: SuperDispatchTheme) {
  theme.props.MuiTabs = {
    variant: 'scrollable',
    textColor: 'primary',
    indicatorColor: 'primary',
  };

  theme.overrides.MuiTabs = { root: { minHeight: theme.spacing(5) } };

  theme.overrides.MuiTab = {
    root: {
      fontWeight: undefined,
      textTransform: undefined,
      minHeight: theme.spacing(5),

      transition: theme.transitions.create(['color'], {
        duration: theme.transitions.duration.short,
      }),

      fontSize: fontSizeVariant('body1', 'mobile'),
      lineHeight: fontHeightVariant('body1', 'mobile'),

      [theme.breakpoints.up('sm')]: {
        minWidth: undefined,
        padding: theme.spacing(0.75, 3),
        fontSize: fontSizeVariant('body1', 'desktop'),
        lineHeight: fontHeightVariant('body1', 'desktop'),
      },
    },

    textColorPrimary: {
      color: Color.Grey500,
      '&:hover, &:focus': { color: Color.Blue300 },
    },
  };
}
