import { SvgIcon } from '@material-ui/core';
import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

export function overrideRadio(theme: SuperDispatchTheme): void {
  theme.props.MuiRadio = {
    color: 'primary',
    icon: (
      <SvgIcon>
        <circle
          cx="12"
          cy="12"
          r="8.5"
          fill={Color.White}
          stroke="currentColor"
        />
      </SvgIcon>
    ),
    checkedIcon: (
      <SvgIcon>
        <circle
          cx="12"
          cy="12"
          r="8.5"
          fill="currentColor"
          stroke="currentColor"
        />

        <circle cx="12" cy="12" r="4" fill={Color.White} />
      </SvgIcon>
    ),
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
