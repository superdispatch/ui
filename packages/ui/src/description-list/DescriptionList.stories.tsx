import { Box } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import NotesIcon from '@material-ui/icons/Notes';
import RoomIcon from '@material-ui/icons/Room';
import {
  makePlayroomStory,
  PlayroomStoryWrapperProps,
} from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { DescriptionList, DescriptionListItem } from './DescriptionList';

export default {
  title: 'Data Display/DescriptionList',
  component: DescriptionList,
  subcomponents: { DescriptionListItem },
};

function Wrapper({ children }: PlayroomStoryWrapperProps) {
  return <Box maxWidth={200}>{children}</Box>;
}

export const Small = makePlayroomStory(
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
  </DescriptionList>,
  { wrapper: Wrapper },
);

export const Medium = makePlayroomStory(
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
  </DescriptionList>,
  { wrapper: Wrapper },
);

export const Large = makePlayroomStory(
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
  </DescriptionList>,
  { wrapper: Wrapper },
);
