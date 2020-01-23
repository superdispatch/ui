import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Color } from '../theme/Color';

export const useDateRangePickerStyles = makeStyles<Theme>(
  theme => ({
    outside: {},
    disabled: {},
    selected: {},
    rangeStart: {},
    rangeEnd: {},

    day: {
      '&$selected:not($outside)': {
        '&$rangeStart:before': { left: theme.spacing(0.5) },
        '&$rangeEnd:before': { right: theme.spacing(0.5) },
        '&:not($rangeStart):not($rangeEnd)': {
          '&:after': { backgroundColor: Color.Transparent },
          '&$disabled': { '&:before': { backgroundColor: Color.Silver100 } },
          '&:not($disabled)': {
            color: Color.Blue500,
            '&:before': { backgroundColor: Color.Blue50 },
          },
        },
      },
    },
  }),
  { name: 'SuperDispatchDateRangePicker' },
);
