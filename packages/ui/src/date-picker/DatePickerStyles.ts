import { makeStyles } from '@material-ui/styles';

import { Color } from '../theme/Color';
import { datePickerBaseStyles } from './DatepickerBaseStyles';

export const datePickerStyles = {
  ...datePickerBaseStyles,
  selected: {
    borderRadius: '4px',
    color: Color.White,
    background: Color.Blue300,
  },
};

export const useDatePickerStyles = makeStyles(datePickerStyles);
