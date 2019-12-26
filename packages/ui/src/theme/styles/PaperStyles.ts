import { Theme } from '@material-ui/core';

import { Color } from '../Color';

export function applyPaperStyles(theme: Required<Theme>) {
  theme.props.MuiPaper = {
    elevation: 0,
  };

  theme.overrides.MuiPaper = {
    elevation0: {
      border: `1px solid ${Color.Silver400}`,
    },
  };
}
