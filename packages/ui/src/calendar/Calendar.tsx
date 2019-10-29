import { Divider, Grid, Hidden, List, ListItem, Typography } from '@material-ui/core';
import { GridDirection } from '@material-ui/core/Grid';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import React, { forwardRef, ReactNode } from 'react';
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
  HTMLUListElement,
  CalendarQuickSelectionItemProps
>(({ onClick, selected, children }) => (
  <ListItem button={true} selected={selected} onClick={onClick}>
    {children}
  </ListItem>
));

export interface CalendarProps
  extends Omit<DayPickerProps, 'classNames' | 'captionElement' | 'weekdayElement'> {
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
