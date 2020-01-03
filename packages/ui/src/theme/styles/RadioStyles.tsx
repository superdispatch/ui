import { Color } from '../Color';
import { SuperDispatchTheme } from '../ThemeProvider';

export function applyRadioStyles(theme: SuperDispatchTheme) {
  theme.props.MuiRadio = {
    color: 'primary',
  };

  theme.overrides.MuiRadio = {
    root: {
      color: Color.Grey100,
      marginTop: theme.spacing(-0.625),
      marginBottom: theme.spacing(-0.625),
    },

    colorPrimary: {
      '&$checked$disabled': {
        color: Color.Silver500,
      },

      '&:hover:not($checked)': {
        color: Color.Grey100,
      },
    },
  };
}
