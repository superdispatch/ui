import { Typography } from '@material-ui/core';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { Calendar } from './Calendar.playroom';
import { CalendarQuickSelection } from './CalendarQuickSelection';
import { CalendarQuickSelectionItem } from './CalendarQuickSelectionItem';

export default {
  title: 'Dates/Calendar',
  component: Calendar,
  subcomponents: { CalendarQuickSelection, CalendarQuickSelectionItem },
};

export const basic = makePlayroomStory(<Calendar />);
export const disabledDays = makePlayroomStory(
  <Calendar disabledDays={(date) => date.getDate() % 2 === 0} />,
);
export const highlightedDays = makePlayroomStory(
  <Calendar
    highlightedDays={{
      blue: (date) => date.getDay() === 0 || date.getDay() === 6,
      green: (date) => date.getDay() === 1,
      purple: (date) => date.getDay() === 2,
      red: (date) => date.getDay() === 3,
      teal: (date) => date.getDay() === 4,
      yellow: (date) => date.getDay() === 5,
    }}
  />,
);
export const footer = makePlayroomStory(
  <Calendar
    footer={<Typography color="textSecondary">Footer helper text</Typography>}
  />,
);

export const quickSelection = makePlayroomStory(
  <Calendar
    quickSelection={
      <CalendarQuickSelection>
        <CalendarQuickSelectionItem>Today</CalendarQuickSelectionItem>
        <CalendarQuickSelectionItem>Tomorrow</CalendarQuickSelectionItem>
        <CalendarQuickSelectionItem>Yesterday</CalendarQuickSelectionItem>
      </CalendarQuickSelection>
    }
  />,
);
