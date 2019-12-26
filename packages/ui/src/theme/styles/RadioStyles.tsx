import { Theme } from '@material-ui/core';

import { Color } from '../Color';

export function applyRadioStyles(theme: Required<Theme>) {
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
