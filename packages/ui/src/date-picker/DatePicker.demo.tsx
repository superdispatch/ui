import React, { useState, useCallback } from 'react';
import moment from 'moment';
import { Box, Typography } from '@material-ui/core';
import TextField from '@sdkit/textfield';
import { ThemeProvider } from '..';
import { DatePicker, DatePickerProps, DatePickerInputComponentProps } from './DatePicker';

const InputComponent = ({ value, ...props }: DatePickerInputComponentProps) => {
  const [startDate, endDate] = value;
  const formatValue = (date?: Date) => (date ? moment(date).format('MMM DD, YYYY') : '');
  const formattedValue =
    startDate || endDate ? `${formatValue(startDate)} - ${formatValue(endDate)}` : '';
  return <TextField value={formattedValue} {...props} />;
};

export function DatePickerDemo() {
  const [value, setValue] = useState<DatePickerProps['value']>([]);
  const handleChange: DatePickerProps['onChange'] = useCallback(newValue => setValue(newValue), []);

  return (
    <ThemeProvider>
      <Box p={2}>
        <Typography variant="h2">Date Picker</Typography>
      </Box>

      <Box p={2} width={270}>
        <DatePicker value={value} onChange={handleChange} InputComponent={InputComponent} />
      </Box>
    </ThemeProvider>
  );
}
