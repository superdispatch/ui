import { Paper, Popover, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import DayPicker, {
  CaptionElementProps,
  DayPickerProps,
  WeekdayElementProps,
} from 'react-day-picker';

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

const weekdaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const captionElement = ({ date, localeUtils, classNames, ...props }: CaptionElementProps) => (
  <Typography variant="h4" className={classNames.caption} {...props}>
    {localeUtils.formatMonthTitle(date)}
  </Typography>
);

const weekdayElement = ({ weekday, localeUtils, locale, ...props }: WeekdayElementProps) => (
  <Typography variant="h5" {...props}>
    {weekdaysShort[weekday]}
  </Typography>
);

export function DatePickerBase({
  InputComponent,
  classNames,
  value,
  anchorEl,
  handleOpen,
  handleClose,
  ...props
}: DatePickerBaseProps & DatePickerBaseState) {
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
            captionElement={captionElement}
            weekdayElement={weekdayElement}
            {...props}
          />
        </Paper>
      </Popover>
    </>
  );
}
