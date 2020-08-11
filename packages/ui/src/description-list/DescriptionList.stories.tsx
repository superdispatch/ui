import { Box } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import NotesIcon from '@material-ui/icons/Notes';
import RoomIcon from '@material-ui/icons/Room';
import { Meta } from '@storybook/react';
import React from 'react';

import { DescriptionList, DescriptionListItem } from './DescriptionList';

export default {
  title: 'Data Display/DescriptionList',
  component: DescriptionList,
  subcomponents: { DescriptionListItem },
  decorators: [
    (Story) => (
      <Box maxWidth={200}>
        <Story />
      </Box>
    ),
  ],
} as Meta;

export const small = () => (
  <DescriptionList size="small">
    <DescriptionListItem
      icon={<CalendarTodayIcon />}
      label="Posted on"
      content="Feb 03, 2020"
    />
    <DescriptionListItem
      icon={<RoomIcon />}
      content="167 Zosh Rd, Dallas, PA 18612"
    />
    <DescriptionListItem icon={<NotesIcon />} label="Notes" />
  </DescriptionList>
);

export const medium = () => (
  <DescriptionList size="medium">
    <DescriptionListItem
      icon={<CalendarTodayIcon />}
      label="Posted on"
      content="Feb 03, 2020"
    />
    <DescriptionListItem
      icon={<RoomIcon />}
      content="167 Zosh Rd, Dallas, PA 18612"
    />
    <DescriptionListItem icon={<NotesIcon />} label="Notes" />
  </DescriptionList>
);

export const large = () => (
  <DescriptionList size="large">
    <DescriptionListItem
      icon={<CalendarTodayIcon />}
      label="Posted on"
      content="Feb 03, 2020"
    />
    <DescriptionListItem
      icon={<RoomIcon />}
      content="167 Zosh Rd, Dallas, PA 18612"
    />
    <DescriptionListItem icon={<NotesIcon />} label="Notes" />
  </DescriptionList>
);
