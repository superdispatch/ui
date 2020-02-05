import { Typography } from '@material-ui/core';
import React, { forwardRef } from 'react';
import { CaptionElementProps } from 'react-day-picker';

export const CalendarCaption = forwardRef<
  HTMLHeadingElement,
  CaptionElementProps
>(({ date, localeUtils, classNames, onClick }, ref) => (
  <Typography
    ref={ref}
    variant="h4"
    onClick={onClick}
    className={classNames.caption}
  >
    {localeUtils.formatMonthTitle(date)}
  </Typography>
));
