import { Theme } from '@material-ui/core';

export function applyCardStyles(theme: Required<Theme>) {
  theme.props.MuiCard = {
    elevation: 0,
  };

  theme.overrides.MuiCardContent = {
    root: {
      '&:last-child': {
        paddingBottom: undefined,
      },
    },
  };
}
