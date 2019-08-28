import { Paper,Popover } from '@material-ui/core';
import React, { useState } from 'react';
import DayPicker, { DayPickerProps } from 'react-day-picker';

export type DatePickerBaseInputComponent<TProps> = React.ComponentType<TProps>;

export interface DatePickerBaseInputComponentProps<TValue>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value: TValue;
}

export interface DatePickerBaseState {
  anchorEl: HTMLInputElement | null;
  handleOpen: (event: React.MouseEvent<HTMLInputElement>) => void;
  handleClose: () => void;
}

export interface DatePickerBaseProps extends DayPickerProps {
  value: Date | [Date?, Date?];
  InputComponent: DatePickerBaseInputComponent<any>;
}

export function useDatePickerBaseState() {
  const [anchorEl, setAnchorEl] = useState<DatePickerBaseState['anchorEl']>(null);
  const handleOpen: DatePickerBaseState['handleOpen'] = event => setAnchorEl(event.currentTarget);
  const handleClose: DatePickerBaseState['handleClose'] = () => setAnchorEl(null);

  return {
    anchorEl,
    handleOpen,
    handleClose,
  };
}

export function DatePickerBase({
  InputComponent,
  classNames,
  value,
  anchorEl,
  handleOpen,
  handleClose,
  ...props
}: DatePickerBaseProps & DatePickerBaseState) {
  const weekdaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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
          <DayPicker
            classNames={classNames}
            weekdaysShort={weekdaysShort}
            showOutsideDays={true}
            {...props}
          />
        </Paper>
      </Popover>
    </>
  );
}
