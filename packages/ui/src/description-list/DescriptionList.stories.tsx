import { Link } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/Chat';
import NotesIcon from '@material-ui/icons/Notes';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import { Meta } from '@storybook/react';
import { PhoneLink, PhoneText } from '@superdispatch/phones';
import { Box } from '@superdispatch/ui-lab';

import { DescriptionList, DescriptionListItem } from './DescriptionList';

export default {
  title: 'Data Display/DescriptionList',
  component: DescriptionList,
  subcomponents: { DescriptionListItem },
  decorators: [
    (Story) => (
      <Box maxWidth="200px">
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

export const nested = () => (
  <DescriptionList>
    <DescriptionListItem
      icon={<RoomIcon />}
      content="NISSAN WAY, CANTON, MS 39046"
    />
    <DescriptionListItem
      icon={<PhoneIcon />}
      content=""
      fallback="No pickup date"
    />

    <DescriptionList size="small">
      <DescriptionListItem icon={<PersonIcon />} content="MGR MGR" />
      <DescriptionListItem
        inset={true}
        content={<PhoneText phone="6018550402" format="national" />}
      />
    </DescriptionList>

    <DescriptionListItem
      icon={<ChatIcon />}
      content=""
      fallback="No pickup notes"
    />
  </DescriptionList>
);
