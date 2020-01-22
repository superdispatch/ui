import { SuperDispatchTheme } from '../ThemeProvider';
import { typographyVariant } from './TypographyStyles';

export function applyCssBaselineStyles(theme: SuperDispatchTheme): void {
  theme.overrides.MuiCssBaseline = {
    '@global': {
      body: {
        ...typographyVariant('body2', 'mobile'),

        [theme.breakpoints.up('sm')]: typographyVariant('body2', 'desktop'),
      },
    },
  };
}
