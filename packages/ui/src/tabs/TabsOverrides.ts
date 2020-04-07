import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

export function overrideTabs(theme: SuperDispatchTheme) {
  theme.props.MuiTabs = {
    variant: 'scrollable',
    textColor: 'primary',
    indicatorColor: 'primary',
  };

  theme.overrides.MuiTabs = { root: { minHeight: theme.spacing(5) } };

  theme.overrides.MuiTab = {
    root: {
      ...theme.typography.body2,

      minHeight: theme.spacing(5),

      transition: theme.transitions.create(['color'], {
        duration: theme.transitions.duration.short,
      }),

      [theme.breakpoints.up('sm')]: {
        minWidth: undefined,
        fontSize: undefined,
        padding: theme.spacing(0.75, 3),
      },
    },

    textColorPrimary: {
      color: Color.Grey500,
      '&:hover, &:focus': { color: Color.Blue300 },
    },
  };
}
