import { Divider, Grid, Hidden, IconButton, List, ListItem, Typography } from '@material-ui/core';
import { GridDirection } from '@material-ui/core/Grid';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import React, { forwardRef, ReactNode } from 'react';
import DayPicker, {
  CaptionElementProps,
  ClassNames,
  DayPickerProps,
  NavbarElementProps,
  WeekdayElementProps,
} from 'react-day-picker';

import { useCalendarStyles } from './CalendarStyles';

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
        <ChevronLeft />
      </IconButton>

      <IconButton
        size="small"
        color="primary"
        disabled={!showNextButton}
        onClick={() => onNextClick()}
        aria-label={labels.nextMonth}
        className={classNames.navButtonNext}
      >
        <ChevronRight />
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

export interface CalendarQuickSelectionProps {
  children: ReactNode;
}

export const CalendarQuickSelection = forwardRef<HTMLUListElement, CalendarQuickSelectionProps>(
  ({ children }, ref) => (
    <List ref={ref}>
      <ListItem>
        <Typography variant="h4">Quick Selection</Typography>
      </ListItem>

      {children}
    </List>
  ),
);

export interface CalendarQuickSelectionItemProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export const CalendarQuickSelectionItem = forwardRef<
  HTMLDivElement,
  CalendarQuickSelectionItemProps
>(({ onClick, selected, children }, ref) => (
  <ListItem ref={ref} button={true} selected={selected} onClick={onClick}>
    {children}
  </ListItem>
));

export interface CalendarProps
  extends Omit<
    DayPickerProps,
    'classNames' | 'navbarElement' | 'captionElement' | 'weekdayElement'
  > {
  direction?: GridDirection;
  classes?: Partial<ClassNameMap<keyof ClassNames>>;

  footer?: ReactNode;
  quickSelection?: ReactNode;
}

export function Calendar({ footer, classes, direction, quickSelection, ...props }: CalendarProps) {
  const styles = useCalendarStyles({ classes });

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
          classNames={styles}
          navbarElement={CalendarNavbar}
          captionElement={CalendarCaption}
          weekdayElement={CalendarWeekDay}
        />

        {!!footer && <div className={styles.footer}>{footer}</div>}
      </Grid>
    </Grid>
  );
}

if (process.env.NODE_ENV === 'development') {
  CalendarQuickSelection.displayName = 'CalendarQuickSelection';
  CalendarQuickSelectionItem.displayName = 'CalendarQuickSelectionItem';
}
