import React, { useState } from 'react';
import DayPicker, { DayPickerProps } from 'react-day-picker';
import { Popover, Paper } from '@material-ui/core';
import { useStyles } from './DatepickerBase.styles';
import { WEEKDAYS_SHORT } from './DatePickerBase.constants';

export type DatePickerBaseInputComponent<TProps> = React.ComponentType<TProps>;

export interface DatePickerBaseInputComponentProps<TValue>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value: TValue;
}

export interface DatePickerBaseProps extends DayPickerProps {
  value: Date | Date[];
  InputComponent: DatePickerBaseInputComponent<any>;
}

export function DatePickerBase({ InputComponent, value, ...props }: DatePickerBaseProps) {
  const { ...classNames } = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLInputElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <InputComponent onClick={handleOpen} value={value} readOnly={true} />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleClose}
      >
        <Paper>
          <DayPicker classNames={classNames} weekdaysShort={WEEKDAYS_SHORT} {...props} />
        </Paper>
      </Popover>
    </>
  );
}
