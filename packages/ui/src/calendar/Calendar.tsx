import { Typography } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import React from 'react';
import DayPicker, {
  CaptionElementProps,
  ClassNames,
  DayPickerProps,
  WeekdayElementProps,
} from 'react-day-picker';

import { useCalendarStyles } from './CalendarStyles';

function CalendarCaption({ date, localeUtils, classNames, ...props }: CaptionElementProps) {
  return (
    <Typography variant="h4" className={classNames.caption} {...props}>
      {localeUtils.formatMonthTitle(date)}
    </Typography>
  );
}

function CalendarWeekDay({ weekday, className }: WeekdayElementProps) {
  const weekdaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Typography variant="h5" className={className}>
      {weekdaysShort[weekday]}
    </Typography>
  );
}

export interface CalendarProps
  extends Omit<DayPickerProps, 'classNames' | 'captionElement' | 'weekdayElement'> {
  classes?: Partial<ClassNameMap<keyof ClassNames>>;
}

export function Calendar({ classes, ...props }: CalendarProps) {
  const styles = useCalendarStyles({ classes });

  return (
    <DayPicker
      {...props}
      classNames={styles}
      captionElement={CalendarCaption}
      weekdayElement={CalendarWeekDay}
    />
  );
}
