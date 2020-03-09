import { Paper, Typography } from '@material-ui/core';
import { boolean, select } from '@storybook/addon-knobs';
import {
  Calendar,
  CalendarProps,
  CalendarQuickSelection,
  CalendarQuickSelectionItem,
  DateUtils,
  useDateUtils,
} from '@superdispatch/dates';
import React, { useMemo } from 'react';

type Color = 'off' | keyof NonNullable<CalendarProps['highlightedDays']>;

export default function CalendarDemo() {
  const disabled = boolean('Disabled', false);
  const hasFooter = boolean('With Footer', false);
  const hasQuickSelection = boolean('With Quick Selection', false);
  const color = select<Color>(
    'Color',
    {
      Off: 'off',
      Blue: 'blue',
      Green: 'green',
      Purple: 'purple',
      Red: 'red',
      Teal: 'teal',
      Yellow: 'yellow',
    },
    'off',
  );

  const dateUtils = useDateUtils();
  const today = useMemo(() => dateUtils.startOf(Date.now(), 'day'), [
    dateUtils,
  ]);

  const quickSelectionDays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, idx) =>
        dateUtils.plus(today, { day: idx * 2 }),
      ),
    [today, dateUtils],
  );

  return (
    <Paper elevation={8} style={{ display: 'inline-block' }}>
      <Calendar
        fromMonth={!disabled ? undefined : today}
        toMonth={!disabled ? undefined : today}
        disabledDays={
          !disabled ? undefined : date => date.getTime() < Date.now()
        }
        footer={
          hasFooter && (
            <Typography color="textSecondary">Footer helper text</Typography>
          )
        }
        highlightedDays={
          color === 'off'
            ? {}
            : {
                [color]: (date: Date, utils: DateUtils) =>
                  utils.toObject(date).day % 2 === 0,
              }
        }
        quickSelection={
          hasQuickSelection && (
            <CalendarQuickSelection>
              {quickSelectionDays.map((day, idx) => (
                <CalendarQuickSelectionItem key={idx}>
                  {dateUtils.format(day, 'date')}
                </CalendarQuickSelectionItem>
              ))}
            </CalendarQuickSelection>
          )
        }
      />
    </Paper>
  );
}
