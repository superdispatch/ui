import { Typography } from '@material-ui/core';
import React from 'react';
import { WeekdayElementProps } from 'react-day-picker';

export function CalendarWeekDay({ weekday, className }: WeekdayElementProps) {
  const weekdaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Typography variant="h5" className={className}>
      {weekdaysShort[weekday]}
    </Typography>
  );
}
