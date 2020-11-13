import { Box, IconButton, Link } from '@material-ui/core';
import { Edit as EditIcon, Room as RoomIcon } from '@material-ui/icons';
import { Meta } from '@storybook/react';
import { Placeholder } from '@superdispatch/ui-docs';
import React from 'react';

import { OverflowText, Stack } from '..';
import { Column, Columns } from './Columns';

export default {
  title: 'Layout/Columns',
  component: Column,
  subcomponents: { Columns },
  decorators: [
    (Story) => (
      <Box maxWidth={320}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    componentSubtitle: (
      <>
        Heavily inspired by the{' '}
        <Link href="https://seek-oss.github.io/braid-design-system/components/Column">
          Column
        </Link>{' '}
        and{' '}
        <Link href="https://seek-oss.github.io/braid-design-system/components/Columns">
          Columns
        </Link>{' '}
        components from the{' '}
        <Link href="https://seek-oss.github.io/braid-design-system">
          BRAID Design System
        </Link>
        .
      </>
    ),
  },
} as Meta;

export const noSpace = () => (
  <Columns>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>
  </Columns>
);

export const customSpace = () => (
  <Columns space={1}>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>
  </Columns>
);

export const responsiveSpace = () => (
  <Columns space={{ xs: 2, sm: 1 }}>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>
  </Columns>
);

export const alignment = () => (
  <Columns space={1} align="center">
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={64} text="Second" />
    </Column>
  </Columns>
);

export const responsiveAlignment = () => (
  <Columns space={1} align={{ xs: 'top', sm: 'center' }}>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={64} text="Second" />
    </Column>
  </Columns>
);

export const reverse = () => (
  <Columns space={1} reverse={true}>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>

    <Column>
      <Placeholder height={48} text="Third" />
    </Column>
  </Columns>
);

export const responsiveReverse = () => (
  <Columns space={1} reverse={{ xs: true, sm: false }}>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>

    <Column>
      <Placeholder height={48} text="Third" />
    </Column>
  </Columns>
);

export const collapseBelowTablet = () => (
  <Columns space={1} collapseBelow="sm">
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>

    <Column>
      <Placeholder height={48} text="Third" />
    </Column>
  </Columns>
);

export const collapseBelowDesktop = () => (
  <Columns space={1} collapseBelow="md">
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>

    <Column>
      <Placeholder height={48} text="Third" />
    </Column>
  </Columns>
);

export const reverseAndCollapseBelowTablet = () => (
  <Columns space={1} collapseBelow="sm" reverse={{ xs: true, sm: false }}>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>

    <Column>
      <Placeholder height={48} text="Third" />
    </Column>
  </Columns>
);

export const availableWidths = () => (
  <Stack space={1}>
    <Columns space={1}>
      <Column width="adaptive">
        <Placeholder height={48} text="Adaptive" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space={1}>
      <Column width="content">
        <Placeholder height={48} text="Content" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space={1}>
      <Column width="adaptive">
        <Placeholder height={48} text="Adaptive" />
      </Column>

      <Column width="content">
        <Placeholder height={48} text="Content" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space={1}>
      <Column width="adaptive">
        <Placeholder height={48} text="Adaptive" />
      </Column>

      <Column width="adaptive">
        <Placeholder height={48} text="Adaptive" />
      </Column>

      <Column width="adaptive">
        <Placeholder height={48} text="Adaptive" />
      </Column>

      <Column width="adaptive">
        <Placeholder height={48} text="Adaptive" />
      </Column>
    </Columns>

    <Columns space={1}>
      <Column width="adaptive">
        <Placeholder height={48} text="Adaptive" />
      </Column>

      <Column width="adaptive">
        <Placeholder height={48} text="Adaptive" />
      </Column>

      <Column width="adaptive">
        <Placeholder height={48} text="Adaptive" />
      </Column>

      <Column width="adaptive">
        <Placeholder height={48} text="Adaptive" />
      </Column>

      <Column width="adaptive">
        <Placeholder height={48} text="Adaptive" />
      </Column>
    </Columns>

    <Columns space={1}>
      <Column width="content">
        <Placeholder height={48} text="Content" />
      </Column>

      <Column width="content">
        <Placeholder height={48} text="Content" />
      </Column>

      <Column width="content">
        <Placeholder height={48} text="Content" />
      </Column>

      <Column width="content">
        <Placeholder height={48} text="Content" />
      </Column>
    </Columns>

    <Columns space={1}>
      <Column width="1/2">
        <Placeholder height={48} text="1/2" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space={1}>
      <Column width="1/3">
        <Placeholder height={48} text="1/3" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space={1}>
      <Column width="2/3">
        <Placeholder height={48} text="2/3" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space={1}>
      <Column width="1/4">
        <Placeholder height={48} text="1/4" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space={1}>
      <Column width="3/4">
        <Placeholder height={48} text="3/4" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space={1}>
      <Column width="1/5">
        <Placeholder height={48} text="1/5" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space={1}>
      <Column width="2/5">
        <Placeholder height={48} text="2/5" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space={1}>
      <Column width="3/5">
        <Placeholder height={48} text="3/5" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space={1}>
      <Column width="4/5">
        <Placeholder height={48} text="4/5" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>
  </Stack>
);

export const responsiveWidths = () => (
  <Columns space={1}>
    <Column width={{ xs: '1/2', sm: '3/5' }}>
      <Placeholder
        height={112}
        code={JSON.stringify({ xs: '1/2', sm: '3/5' }, null, 2)}
      />
    </Column>

    <Column>
      <Placeholder height={112} text="Fluid" />
    </Column>
  </Columns>
);

export const overflowText = () => (
  <Stack>
    <Columns space={1} align="center">
      <Column width="content">
        <RoomIcon color="action" />
      </Column>

      <Column width="adaptive">
        <OverflowText>1617 Main St Fl 3</OverflowText>
      </Column>

      <Column width="content">
        <IconButton size="small">
          <EditIcon />
        </IconButton>
      </Column>
    </Columns>

    <Columns space={1} align="center">
      <Column width="content">
        <RoomIcon color="action" />
      </Column>

      <Column width="adaptive">
        <OverflowText>
          1617 Main St Fl 3 Kansas City, MO 64108-1326
        </OverflowText>
      </Column>

      <Column width="content">
        <IconButton size="small">
          <EditIcon />
        </IconButton>
      </Column>
    </Columns>
  </Stack>
);
