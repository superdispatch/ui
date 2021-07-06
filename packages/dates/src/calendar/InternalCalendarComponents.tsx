import { IconButton, Typography } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { ReactElement } from 'react';
import {
  CaptionElementProps,
  NavbarElementProps,
  WeekdayElementProps,
} from 'react-day-picker';

export function CalendarCaption({
  date,
  localeUtils,
  classNames,
  onClick,
}: CaptionElementProps): ReactElement {
  return (
    <Typography variant="h4" onClick={onClick} className={classNames.caption}>
      {localeUtils.formatMonthTitle(date)}
    </Typography>
  );
}

export function CalendarNavbar({
  labels,
  classNames,
  onNextClick,
  onPreviousClick,
  showNextButton,
  showPreviousButton,
}: NavbarElementProps): ReactElement {
  return (
    <>
      <IconButton
        size="small"
        color="primary"
        disabled={!showPreviousButton}
        onClick={() => {
          onPreviousClick();
        }}
        aria-label={labels.previousMonth}
        className={classNames.navButtonPrev}
      >
        <ChevronLeft color="action" />
      </IconButton>

      <IconButton
        size="small"
        color="primary"
        disabled={!showNextButton}
        onClick={() => {
          onNextClick();
        }}
        aria-label={labels.nextMonth}
        className={classNames.navButtonNext}
      >
        <ChevronRight color="action" />
      </IconButton>
    </>
  );
}

const SHORT_WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function CalendarWeekDay({
  weekday,
  className,
  localeUtils,
}: WeekdayElementProps): ReactElement {
  return (
    <Typography
      variant="h5"
      component="abbr"
      className={className}
      title={localeUtils.formatWeekdayLong(weekday)}
    >
      {SHORT_WEEKDAYS[weekday]}
    </Typography>
  );
}
