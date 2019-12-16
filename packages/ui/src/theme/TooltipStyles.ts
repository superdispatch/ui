import { Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

import { Color } from './Color';
import { fontHeightVariant, fontSizeVariant } from './TypographyStyles';

function popperArrowVariant(
  arrowOverriders: CSSProperties,
  beforeArrowOverrides: CSSProperties,
) {
  return {
    width: undefined,
    height: undefined,

    top: undefined,
    left: undefined,
    right: undefined,
    bottom: undefined,

    marginTop: '0.6em',
    marginLeft: '0.6em',
    marginRight: '0.6em',
    marginBottom: '0.6em',

    ...arrowOverriders,

    '&::before': {
      borderColor: undefined,
      borderWidth: undefined,

      ...beforeArrowOverrides,
    },
  };
}

export function applyTooltipStyles(theme: Theme) {
  theme.props = theme.props || {};
  theme.overrides = theme.overrides || {};

  theme.props.MuiTooltip = { arrow: true };

  theme.overrides.MuiTooltip = {
    tooltip: {
      position: 'relative',
      backgroundColor: Color.Grey400,
      padding: theme.spacing(1, 1.5),
      fontSize: fontSizeVariant('body1'),
      lineHeight: fontHeightVariant('body1'),
    },

    popperArrow: {
      '&[x-placement*="top"] $arrow': popperArrowVariant(
        { bottom: 0, marginBottom: '-0.5em' },
        { borderBottomRightRadius: 2 },
      ),
      '&[x-placement*="left"] $arrow': popperArrowVariant(
        { right: 0, marginRight: '-0.5em' },
        { borderTopRightRadius: 2 },
      ),
      '&[x-placement*="right"] $arrow': popperArrowVariant(
        { left: 0, marginLeft: '-0.5em' },
        { borderBottomLeftRadius: 2 },
      ),
      '&[x-placement*="bottom"] $arrow': popperArrowVariant(
        { top: 0, marginTop: '-0.5em' },
        { borderTopLeftRadius: 2 },
      ),
    },

    arrow: {
      color: Color.Grey400,
      fontSize: theme.spacing(1),
      transform: 'rotate3d(0, 0, 1, 45deg)',

      '&::before': {
        width: '1em',
        height: '1em',
        borderStyle: undefined,
        backgroundColor: 'currentColor',
      },
    },
  };
}
