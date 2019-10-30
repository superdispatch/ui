import { CSSProperties, makeStyles } from '@material-ui/styles';

import { Color } from '../theme/Color';

function makeRangeStyles(type: 'first' | 'last'): CSSProperties {
  return {
    '&:not(.SuperDispatchCalendar-outside)': {
      '&$selected': {
        color: Color.White,
      },

      '&:after': {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 4,
        background: `${Color.Blue300}`,
      },

      '&:before': {
        left: type === 'first' ? '50%' : undefined,
        right: type === 'last' ? '50%' : undefined,
      },
    },
  };
}

export const useDateRangePickerStyles = makeStyles(
  {
    day: { zIndex: 1 },

    firstDayOfRange: makeRangeStyles('first'),
    lastDayOfRange: makeRangeStyles('last'),

    selected: {
      '&:not(.SuperDispatchCalendar-outside)': {
        color: Color.Blue500,

        '&:before': {
          content: '""',
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: -1,
          right: -1,
          bottom: 0,
          background: Color.Blue50,
        },

        '&:first-of-type:before': {
          borderRadius: '4px 0 0 4px',
        },

        '&:last-of-type:before': {
          borderRadius: '0 4px 4px 0',
        },
      },
    },
  },
  { name: 'SuperDispatchDateRangePicker' },
);
