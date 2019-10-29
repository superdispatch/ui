import { makeStyles } from '@material-ui/styles';

import { Color } from '../theme/Color';

export const useDatePickerStyles = makeStyles(
  {
    selected: {
      borderRadius: '4px',
      color: Color.White,
      background: Color.Blue300,
    },
  },
  { name: 'DatePickerStyles' },
);
