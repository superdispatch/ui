import { Theme } from '@material-ui/core';

import { Color } from '../theme/Color';

export function applyPaperStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiPaper = {
    elevation: 0,
  };

  theme.overrides.MuiPaper = {
    elevation0: {
      border: `1px solid ${Color.Silver400}`,
    },
  };
}
