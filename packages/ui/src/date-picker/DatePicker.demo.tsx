import { Box, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';

import {
  DatePicker,
  DatePickerProps,
  DateRangePicker,
  DateRangePickerProps,
  DateRangePickerQuickSelectionItem,
} from '..';

const formatValue = (date?: Date) => (date ? moment(date).format('MMM DD, YYYY') : '');

const DateInputComponent: DatePickerProps['InputComponent'] = ({ value, ...props }) => {
  const formattedValue = formatValue(value);
  return <input value={formattedValue} {...props} />;
};

export function DatePickerDemo() {
  const [value, setValue] = useState();

  return (
    <Box p={2} width={270}>
      <DatePicker value={value} onChange={setValue} InputComponent={DateInputComponent} />

      <pre>{JSON.stringify({ value }, null, 2)}</pre>
    </Box>
  );
}

const DateRangeInputComponent: DateRangePickerProps['InputComponent'] = ({ value, ...props }) => {
  const [startDate, endDate] = value ? value : [];
  const formattedValue =
    startDate || endDate ? `${formatValue(startDate)} - ${formatValue(endDate)}` : '';
  return <input value={formattedValue} {...props} />;
};

export function DateRangePickerDemo() {
  const [value, setValue] = useState<DateRangePickerProps['value']>([]);

  return (
    <Box p={2} width={270}>
      <DateRangePicker
        value={value}
        onChange={setValue}
        InputComponent={DateRangeInputComponent}
        numberOfMonths={2}
      />

      <pre>{JSON.stringify({ value }, null, 2)}</pre>
    </Box>
  );
}

const today = moment()
  .startOf('day')
  .hours(12)
  .toDate();

const addDays = (date: Date, daysCount: number) =>
  moment(date)
    .add(daysCount, 'days')
    .toDate();

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

export function DateRangePickerQuickSelectionDemo() {
  const [value, setValue] = useState<DateRangePickerProps['value']>([]);

  return (
    <Box p={2} width={270}>
      <DateRangePicker
        value={value}
        onChange={setValue}
        InputComponent={DateRangeInputComponent}
        quickSelectionItems={dateRangePickerQuickSelectionItems}
        numberOfMonths={2}
        footer={
          <Typography color="textSecondary">
            Selected date range allows preferred carriers to instantly book loads inside the Super
            Loadboard.
            <br />
            Dates out of selected range will still be available to request.
          </Typography>
        }
      />

      <pre>{JSON.stringify({ value }, null, 2)}</pre>
    </Box>
  );
}

export function DateRangePickerDisabled() {
  const [value, setValue] = useState<DateRangePickerProps['value']>([]);

  return (
    <Box p={2} width={270}>
      <DateRangePicker
        value={value}
        onChange={setValue}
        InputComponent={DateRangeInputComponent}
        quickSelectionItems={dateRangePickerQuickSelectionItems}
        numberOfMonths={2}
        disabled={true}
      />

      <pre>{JSON.stringify({ value }, null, 2)}</pre>
    </Box>
  );
}
