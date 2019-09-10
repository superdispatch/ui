import { Box, Typography } from '@material-ui/core';
import TextField from '@sdkit/textfield';
import moment from 'moment';
import React, { useCallback, useState } from 'react';

import { ThemeProvider } from '..';
import { DatePicker, DatePickerInputComponentProps, DatePickerProps } from './DatePicker';
import {
  DateRangePicker,
  DateRangePickerInputComponentProps,
  DateRangePickerProps,
  DateRangePickerQuickSelectionItem,
} from './DateRangePicker';

const today = new Date();
const addDays = (date: Date, daysCount: number) =>
  moment(date)
    .add(daysCount, 'days')
    .toDate();

const formatValue = (date?: Date) => (date ? moment(date).format('MMM DD, YYYY') : '');

const DateInputComponent = ({ value, ...props }: DatePickerInputComponentProps) => {
  const formattedValue = formatValue(value);
  return <TextField value={formattedValue} {...props} />;
};

const dateRangePickerQuickSelectionItems: DateRangePickerQuickSelectionItem[] = [
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
].map(daysCount => ({
  label: `${daysCount} days`,
  value: [today, addDays(today, daysCount - 1)],
}));

const DateRangeInputComponent = ({ value, ...props }: DateRangePickerInputComponentProps) => {
  const [startDate, endDate] = value;
  const formattedValue =
    startDate || endDate ? `${formatValue(startDate)} - ${formatValue(endDate)}` : '';
  return <TextField value={formattedValue} {...props} />;
};

export function DatePickerDemo() {
  const [datePickerValue, setDatePickerValue] = useState();
  const handleDatePickerChange: DatePickerProps['onChange'] = useCallback(
    newValue => setDatePickerValue(newValue),
    [],
  );
  const [dateRangePickeerValue, setDateRangePickerValue] = useState<DateRangePickerProps['value']>(
    [],
  );
  const handleDateRangePickerChange: DateRangePickerProps['onChange'] = useCallback(
    newValue => setDateRangePickerValue(newValue),
    [],
  );

  return (
    <ThemeProvider>
      <Box p={2}>
        <Typography variant="h2">Date Picker</Typography>
      </Box>

      <Box p={2} width={270}>
        <DatePicker
          value={datePickerValue}
          onChange={handleDatePickerChange}
          InputComponent={DateInputComponent}
        />
      </Box>

      <Box p={2}>
        <Typography variant="h2">Date Range Picker</Typography>
      </Box>

      <Box p={2} width={270}>
        <DateRangePicker
          value={dateRangePickeerValue}
          onChange={handleDateRangePickerChange}
          InputComponent={DateRangeInputComponent}
          numberOfMonths={2}
        />
      </Box>

      <Box p={2}>
        <Typography variant="h2">Quick Selection</Typography>
      </Box>

      <Box p={2} width={270}>
        <DateRangePicker
          value={dateRangePickeerValue}
          onChange={handleDateRangePickerChange}
          InputComponent={DateRangeInputComponent}
          quickSelectionItems={dateRangePickerQuickSelectionItems}
          numberOfMonths={2}
          footer={
            <Typography variant="body2" color="textSecondary">
              Selected date range allows preferred carriers to instantly book loads inside the Super
              Loadboard.
              <br />
              Dates out of selected range will still be available to request.
            </Typography>
          }
        />
      </Box>
    </ThemeProvider>
  );
}
