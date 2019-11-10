import { Divider, Grid, Hidden, IconButton, Typography } from '@material-ui/core';
import { GridDirection } from '@material-ui/core/Grid';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import React, { ReactNode } from 'react';
import DayPicker, {
  CaptionElementProps,
  ClassNames,
  DayModifiers,
  DayPickerProps,
  Modifier,
  NavbarElementProps,
  WeekdayElementProps,
} from 'react-day-picker';

import { normalizeDateRange } from '../date-picker/DateUtils';
import { CalendarDayHighlightColor, useCalendarStyles } from './CalendarStyles';

//
// Date Utils
//

function isFirstDayOfMonth(date: Date): boolean {
  return date.getDate() === 1;
}

function isLastDayOfMonth(date: Date): boolean {
  return (
    date.getMonth() < new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getMonth()
  );
}

//
// Internal Components
//

function CalendarNavbar({
  labels,
  classNames,
  onNextClick,
  onPreviousClick,
  showNextButton,
  showPreviousButton,
}: NavbarElementProps) {
  return (
    <>
      <IconButton
        size="small"
        color="primary"
        disabled={!showPreviousButton}
        onClick={() => onPreviousClick()}
        aria-label={labels.previousMonth}
        className={classNames.navButtonPrev}
      >
        <ChevronLeft color="action" />
      </IconButton>

      <IconButton
        size="small"
        color="primary"
        disabled={!showNextButton}
        onClick={() => onNextClick()}
        aria-label={labels.nextMonth}
        className={classNames.navButtonNext}
      >
        <ChevronRight color="action" />
      </IconButton>
    </>
  );
}

function CalendarCaption({ date, localeUtils, classNames, onClick }: CaptionElementProps) {
  return (
    <Typography variant="h4" onClick={onClick} className={classNames.caption}>
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

//
// Day event and it's handlers
//

export interface CalendarDayModifiers {
  disabled: boolean;
  selected: boolean;
}

export type CalendarDayEventHandler = (date: Date, modifiers: CalendarDayModifiers) => void;

type CalendarDayEventHandlerName =
  | 'onDayClick'
  | 'onDayKeyDown'
  | 'onDayMouseEnter'
  | 'onDayMouseLeave'
  | 'onDayMouseDown'
  | 'onDayMouseUp'
  | 'onDayTouchEnd'
  | 'onDayTouchStart';

type CalendarDayEventProps = Partial<Record<CalendarDayEventHandlerName, CalendarDayEventHandler>>;

type DayPickerDayEventHandlers = Partial<
  Record<CalendarDayEventHandlerName, (day: Date, modifiers: DayModifiers) => void>
>;

function toDayPickerDayEventHandlers(
  styles: ClassNameMap<keyof ClassNames>,
  handlers: CalendarDayEventProps,
): DayPickerDayEventHandlers {
  return Object.keys(handlers).reduce<DayPickerDayEventHandlers>((acc, x) => {
    const key = x as CalendarDayEventHandlerName;
    const handler = handlers[key];

    if (handler) {
      acc[key] = (date, modifiers) => {
        handler(date, {
          disabled: !!modifiers[styles.disabled],
          selected: !!modifiers[styles.selected],
        });
      };
    }

    return acc;
  }, {});
}

//
// Main Component
//

export interface CalendarProps
  extends CalendarDayEventProps,
    Omit<
      DayPickerProps,
      | 'month'
      | 'months'
      | 'initialMonth'
      | 'selectedDays'
      | 'classNames'
      | 'navbarElement'
      | 'captionElement'
      | 'weekdayElement'
      | CalendarDayEventHandlerName
    > {
  selectedDays?: [Date?, Date?];

  direction?: GridDirection;
  classes?: Partial<ClassNameMap<keyof ClassNames>>;

  footer?: ReactNode;
  quickSelection?: ReactNode;

  highlightedDays?: Partial<Record<CalendarDayHighlightColor, Modifier | Modifier[]>>;
}

export function Calendar({
  footer,
  classes,
  direction,
  modifiers,
  quickSelection,
  selectedDays,
  highlightedDays,

  onDayClick,
  onDayKeyDown,
  onDayMouseEnter,
  onDayMouseLeave,
  onDayMouseDown,
  onDayMouseUp,
  onDayTouchEnd,
  onDayTouchStart,

  ...props
}: CalendarProps) {
  const {
    blue,
    green,
    purple,
    red,
    teal,
    yellow,
    firstDayOfMonth,
    lastDayOfMonth,
    ...styles
  } = useCalendarStyles({ classes });
  const handlers = toDayPickerDayEventHandlers(styles, {
    onDayClick,
    onDayKeyDown,
    onDayMouseEnter,
    onDayMouseLeave,
    onDayMouseDown,
    onDayMouseUp,
    onDayTouchEnd,
    onDayTouchStart,
  });

  const [selectedFrom, selectedTo] = normalizeDateRange(selectedDays);

  return (
    <Grid container={true} direction={direction}>
      {!!quickSelection && (
        <>
          <Grid item={true} xs={12} sm="auto">
            {quickSelection}
          </Grid>

          <Hidden xsDown={true}>
            <Grid item={true} sm="auto">
              <Divider orientation="vertical" />
            </Grid>
          </Hidden>

          <Hidden smUp={true}>
            <Grid item={true} xs={12}>
              <Divider orientation="horizontal" />
            </Grid>
          </Hidden>
        </>
      )}

      <Grid item={true} xs={12} sm="auto">
        <DayPicker
          {...props}
          {...handlers}
          classNames={styles}
          navbarElement={CalendarNavbar}
          captionElement={CalendarCaption}
          weekdayElement={CalendarWeekDay}
          initialMonth={selectedFrom}
          selectedDays={
            selectedFrom && selectedTo ? { from: selectedFrom, to: selectedTo } : selectedFrom
          }
          modifiers={{
            ...modifiers,
            [firstDayOfMonth]: isFirstDayOfMonth,
            [lastDayOfMonth]: isLastDayOfMonth,
            [blue]: highlightedDays?.blue,
            [green]: highlightedDays?.green,
            [purple]: highlightedDays?.purple,
            [red]: highlightedDays?.red,
            [teal]: highlightedDays?.teal,
            [yellow]: highlightedDays?.yellow,
          }}
        />

        {!!footer && <div className={styles.footer}>{footer}</div>}
      </Grid>
    </Grid>
  );
}
