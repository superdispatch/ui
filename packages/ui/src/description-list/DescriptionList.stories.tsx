import { Box, Link } from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import NotesIcon from '@material-ui/icons/Notes';
import RoomIcon from '@material-ui/icons/Room';
import { Meta } from '@storybook/react';
import { PhoneLink } from '@superdispatch/phones';
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

export const fallback = () => (
  <DescriptionList>
    <DescriptionListItem
      icon={<CalendarTodayIcon />}
      label="Posted on"
      content={null}
      fallback="N/A"
    />
    <DescriptionListItem
      icon={<RoomIcon />}
      content=""
      fallback="No address available"
    />
    <DescriptionListItem
      icon={<NotesIcon />}
      content={false}
      fallback="No delivery notes"
    />
  </DescriptionList>
);

export const inset = () => (
  <DescriptionList size="small">
    <DescriptionListItem
      icon={<PersonIcon />}
      content={<b>Antony Hoffman</b>}
    />

    <DescriptionListItem
      inset={true}
      content={<PhoneLink phone="303 555 0105" format="national" />}
    />

    <DescriptionListItem
      inset={true}
      content={
        <Link href="mailto:dustin.russel@example.com">
          dustin.russel@example.com
        </Link>
      }
      contentTypographyProps={{
        disableUnderline: true,
        TooltipProps: {
          interactive: true,
          title: 'dustin.russel@example.com',
        },
      }}
    />
  </DescriptionList>
);
