import { Typography } from '@material-ui/core';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { DateUtils } from '../DateUtils';
import { Calendar } from './Calendar.playroom';
import { CalendarQuickSelection } from './CalendarQuickSelection';
import { CalendarQuickSelectionItem } from './CalendarQuickSelectionItem';

export default {
  title: 'Dates/Calendar',
  parameters: { info: { propTables: [Calendar] } },
};

export const Basic = makePlayroomStory(<Calendar />);

export const DisabledDays = makePlayroomStory(
  <Calendar disabledDays={(date) => date.getDate() % 2 === 0} />,
);

export const HighlightedDays = makePlayroomStory(
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

export const WithFooter = makePlayroomStory(
  <Calendar
    footer={<Typography color="textSecondary">Footer helper text</Typography>}
  />,
);

const today = new Date();
const dateUtils = new DateUtils();
const quickSelectionDays = Array.from({ length: 7 }, (_, idx) =>
  dateUtils.plus(today, { day: idx * 2 }),
);

export const WithQuickSelection = makePlayroomStory(
  <Calendar
    quickSelection={
      <CalendarQuickSelection>
        {quickSelectionDays.map((day, idx) => (
          <CalendarQuickSelectionItem key={idx}>
            {dateUtils.format(day, 'date')}
          </CalendarQuickSelectionItem>
        ))}
      </CalendarQuickSelection>
    }
  />,
);
