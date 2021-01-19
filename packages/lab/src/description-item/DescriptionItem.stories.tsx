import { Link } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DomainIcon from '@material-ui/icons/Domain';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import NotesIcon from '@material-ui/icons/Notes';
import PaymentIcon from '@material-ui/icons/Payment';
import PersonIcon from '@material-ui/icons/Person';
import RoomIcon from '@material-ui/icons/Room';
import { Meta } from '@storybook/react';
import { PhoneLink } from '@superdispatch/phones';
import { Column, Columns, Inline, Stack } from '@superdispatch/ui';

import { Box } from '../box/Box';
import { TextBox } from '../text-box/TextBox';
import { DescriptionItem } from './DescriptionItem';

export default {
  title: 'Lab/DescriptionItem',
  component: DescriptionItem,
} as Meta;

export const basic = () => (
  <Box maxWidth="200px">
    <Stack>
      <DescriptionItem icon={<PaymentIcon />} aria-label="payment">
        <Inline space="xxsmall">
          <TextBox color="purple">$1,503</TextBox>
          COD
          <TextBox color="secondary">$49.94/mi</TextBox>
        </Inline>
      </DescriptionItem>

      <DescriptionItem icon={<CalendarTodayIcon />} label="Posted">
        4 hr. ago
      </DescriptionItem>

      <DescriptionItem icon={<RoomIcon />} aria-label="address">
        167 Zosh Rd, Dallas, PA 18612
      </DescriptionItem>

      <DescriptionItem icon={<FingerprintIcon />} label="ID">
        202CB962AC59075B964B07152D234B70
      </DescriptionItem>

      <DescriptionItem icon={<NotesIcon />} label="Notes">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </DescriptionItem>
    </Stack>
  </Box>
);

export const wrap = () => (
  <Box maxWidth="200px">
    <Stack>
      <DescriptionItem icon={<RoomIcon />} wrap={true}>
        167 Zosh Rd, Dallas, PA 18612
      </DescriptionItem>

      <DescriptionItem icon={<FingerprintIcon />} label="ID" wrap={true}>
        202CB962AC59075B964B07152D234B70
      </DescriptionItem>

      <DescriptionItem icon={<NotesIcon />} label="Notes" wrap={true}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </DescriptionItem>
    </Stack>
  </Box>
);

export const fallback = () => (
  <Stack>
    <DescriptionItem
      icon={<CalendarTodayIcon />}
      label="Posted on"
      fallback="N/A"
    >
      {null}
    </DescriptionItem>
    <DescriptionItem icon={<RoomIcon />} fallback="No address available" />
    <DescriptionItem icon={<NotesIcon />} fallback="No delivery notes">
      {false}
    </DescriptionItem>
  </Stack>
);

export const inset = () => (
  <Stack>
    <Stack space="xxsmall">
      <DescriptionItem icon={<PersonIcon />}>Antony Hoffman</DescriptionItem>
      <DescriptionItem inset={true}>
        <PhoneLink phone="303 555 0105" format="national" />
      </DescriptionItem>
      <DescriptionItem inset={true}>
        <Link href="mailto:dustin.russel@example.com">
          dustin.russel@example.com
        </Link>
      </DescriptionItem>
    </Stack>

    <DescriptionItem icon={<RoomIcon />}>
      167 Zosh Rd, Dallas, PA 18612
    </DescriptionItem>
  </Stack>
);

export const complex = () => (
  <Box maxWidth="320px">
    <Stack>
      <Columns space="xsmall">
        <Column width="adaptive">
          <DescriptionItem icon={<DomainIcon />}>Fast Shipper</DescriptionItem>
        </Column>

        <Column width="adaptive">
          <DescriptionItem icon={<CalendarTodayIcon />} label="Received">
            4 hr. ago
          </DescriptionItem>
        </Column>
      </Columns>

      <Columns space="xsmall">
        <Column width="adaptive">
          <DescriptionItem icon={<FingerprintIcon />} label="Load ID">
            02323
          </DescriptionItem>
        </Column>

        <Column width="adaptive">
          <DescriptionItem icon={<CalendarTodayIcon />} label="Received">
            4 hr. ago
          </DescriptionItem>
        </Column>
      </Columns>

      <DescriptionItem icon={<FlightTakeoffIcon />}>
        <Columns space="xxsmall">
          <Column width="adaptive">
            <TextBox noWrap={true}>Kansas City, MO 64105</TextBox>
          </Column>
          <Column width="adaptive">
            <TextBox noWrap={true} color="secondary">
              Oct 04, 2019
            </TextBox>
          </Column>
        </Columns>
      </DescriptionItem>

      <DescriptionItem icon={<FlightLandIcon />}>
        <Columns space="xxsmall">
          <Column width="adaptive">
            <TextBox noWrap={true}>Roeland Park, KS 66205</TextBox>
          </Column>
          <Column width="adaptive">
            <TextBox noWrap={true} color="secondary">
              Oct 04, 2019
            </TextBox>
          </Column>
        </Columns>
      </DescriptionItem>
    </Stack>
  </Box>
);
