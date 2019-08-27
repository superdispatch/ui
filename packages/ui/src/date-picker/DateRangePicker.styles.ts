import { CSSProperties, makeStyles } from '@material-ui/styles';
import { datePickerBaseStyles } from './DatepickerBase.styles';
import { Color } from '../theme/Color';

const cutoffRangeDayStyles: CSSProperties = {
  // FIX ME: Don't use `!important`
  background: `${Color.Blue} !important`,
  color: '#FFF !important',
};

export const dateRangePickerStyles = {
  ...datePickerBaseStyles,
  firstDayOfRange: {
    borderRadius: '4px 0 0 4px',
    ...cutoffRangeDayStyles,
  },
  lastDayOfRange: {
    borderRadius: '0 4px 4px 0',
    ...cutoffRangeDayStyles,
  },
  selected: {
    background: Color.Blue95,
    color: Color.Blue25,
  },
};

export const useStyles = makeStyles(dateRangePickerStyles);
