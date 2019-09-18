import { createStyles, CSSProperties, makeStyles } from '@material-ui/styles';

import { Color } from '../theme/Color';
import { datePickerBaseStyles } from './DatepickerBaseStyles';

const cutoffRangeDayStyles: CSSProperties = {
  // FIX ME: Don't use `!important`
  color: '#FFF !important',

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
};

export const dateRangePickerStyles = createStyles({
  ...datePickerBaseStyles,
  day: {
    ...datePickerBaseStyles.day,
    zIndex: 1,
  },
  firstDayOfRange: {
    ...cutoffRangeDayStyles,

    '&:before': {
      left: '50%',
    },
  },
  lastDayOfRange: {
    ...cutoffRangeDayStyles,

    '&:before': {
      right: '50%',
    },
  },
  selected: {
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
});

export const useDateRangePickerStyles = makeStyles(dateRangePickerStyles);
