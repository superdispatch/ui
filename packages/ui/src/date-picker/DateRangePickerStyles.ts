import { CSSProperties, makeStyles } from '@material-ui/styles';

import { Color } from '../theme/Color';

function makeRangeStyles(type: 'first' | 'last'): CSSProperties {
  return {
    '&$selected': {
      color: Color.White,

      '&:before': {
        left: type === 'first' ? 4 : undefined,
        right: type === 'last' ? 4 : undefined,
      },
    },

    '&:after': {
      content: '""',
      borderRadius: 4,
      background: `${Color.Blue300}`,

      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      position: 'absolute',
    },
  };
}

export const useDateRangePickerStyles = makeStyles(
  {
    day: { zIndex: 1 },

    monthStart: {},
    monthEnd: {},

    rangeStart: makeRangeStyles('first'),
    rangeEnd: makeRangeStyles('last'),

    selected: {
      color: Color.Blue500,
      backgroundColor: 'transparent',

      '&:before': {
        content: '""',
        top: 0,
        left: -1,
        right: -1,
        bottom: 0,
        zIndex: -1,
        position: 'absolute',
        background: Color.Blue50,
      },

      '&:first-child, &$monthStart': {
        '&:before': { borderRadius: '4px 0 0 4px' },
      },

      '&:last-child, &$monthEnd': {
        '&:before': { borderRadius: '0 4px 4px 0' },
      },
    },

    outside: {
      visibility: 'hidden',
    },
  },
  { name: 'SuperDispatchDateRangePicker' },
);
