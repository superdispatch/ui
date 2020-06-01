import { Typography } from '@material-ui/core';
import React from 'react';
import { CaptionElementProps, LocaleUtils } from 'react-day-picker';

export function CalendarCaption({
  date,
  localeUtils,
  classNames,
  onClick,
}: CaptionElementProps) {
  return (
    <Typography variant="h4" onClick={onClick} className={classNames.caption}>
      {(localeUtils as LocaleUtils).formatMonthTitle(date)}
    </Typography>
  );
}
