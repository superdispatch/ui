import { Typography } from '@material-ui/core';
import { Meta } from '@storybook/react';

import { Calendar } from './Calendar.playroom';
import {
  CalendarQuickSelection,
  CalendarQuickSelectionItem,
} from './CalendarQuickSelection';

export default {
  title: 'Dates/Calendar',
  component: Calendar,
  subcomponents: { CalendarQuickSelection, CalendarQuickSelectionItem },
} as Meta;

export const basic = () => <Calendar />;

export const disabledDays = () => (
  <Calendar disabledDays={({ dateValue }) => dateValue.day % 2 === 0} />
);

export const highlightedDays = () => (
  <Calendar
    highlightedDays={{
      blue: ({ dateValue }) => dateValue.day === 0 || dateValue.day === 6,
      green: ({ dateValue }) => dateValue.day === 1,
      purple: ({ dateValue }) => dateValue.day === 2,
      red: ({ dateValue }) => dateValue.day === 3,
      teal: ({ dateValue }) => dateValue.day === 4,
      yellow: ({ dateValue }) => dateValue.day === 5,
    }}
  />
);

export const footer = () => (
  <Calendar
    footer={<Typography color="textSecondary">Footer helper text</Typography>}
  />
);

export const quickSelection = () => (
  <Calendar
    quickSelection={
      <CalendarQuickSelection>
        <CalendarQuickSelectionItem>Today</CalendarQuickSelectionItem>
        <CalendarQuickSelectionItem>Tomorrow</CalendarQuickSelectionItem>
        <CalendarQuickSelectionItem>Yesterday</CalendarQuickSelectionItem>
      </CalendarQuickSelection>
    }
  />
);
