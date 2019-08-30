import { makeStyles } from '@material-ui/styles';

import { Color } from '../theme/Color';
import { datePickerBaseStyles } from './DatepickerBase.styles';

export const datePickerStyles = {
  ...datePickerBaseStyles,
  selected: {
    background: Color.Blue,
    color: '#FFF',
    borderRadius: '4px',
  },
};

export const useDatePickerStyles = makeStyles(datePickerStyles);
