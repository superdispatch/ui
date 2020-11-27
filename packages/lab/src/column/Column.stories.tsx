import { IconButton, Link } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import RoomIcon from '@material-ui/icons/Room';
import { Meta } from '@storybook/react';
import { OverflowText, Stack } from '@superdispatch/ui';
import { Placeholder } from '@superdispatch/ui-docs';

import { Box } from '../box/Box';
import { Column } from './Column';
import { Columns } from './Columns';

export default {
  title: 'Lab/Columns',
  component: Columns,
  subcomponents: { Column },
  decorators: [
    (Story) => (
      <Box
        maxWidth="320px"
        padding="xxsmall"
        borderRadius="small"
        backgroundColor="Silver100"
      >
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
  <Columns space="xsmall">
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>
  </Columns>
);

export const responsiveSpace = () => (
  <Columns space={['small', 'xsmall']}>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>
  </Columns>
);

export const alignment = () => (
  <Columns space="xsmall" align="center">
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={64} text="Second" />
    </Column>
  </Columns>
);

export const responsiveAlignment = () => (
  <Columns space="xsmall" align={['top', 'center']}>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={64} text="Second" />
    </Column>
  </Columns>
);

export const reverse = () => (
  <Columns space="xsmall" reverse={true}>
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
  <Columns space="xsmall" reverse={[true, false]}>
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
  <Columns space="xsmall" collapseBelow="tablet">
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
  <Columns space="xsmall" collapseBelow="desktop">
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
  <Columns space="xsmall" collapseBelow="tablet" reverse={[true, false]}>
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
    <Columns space="xsmall">
      <Column width="adaptive">
        <Placeholder height={48} text="Adaptive" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space="xsmall">
      <Column width="content">
        <Placeholder height={48} text="Content" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space="xsmall">
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

    <Columns space="xsmall">
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

    <Columns space="xsmall">
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

    <Columns space="xsmall">
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

    <Columns space="xsmall">
      <Column width="1/2">
        <Placeholder height={48} text="1/2" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space="xsmall">
      <Column width="1/3">
        <Placeholder height={48} text="1/3" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space="xsmall">
      <Column width="2/3">
        <Placeholder height={48} text="2/3" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space="xsmall">
      <Column width="1/4">
        <Placeholder height={48} text="1/4" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space="xsmall">
      <Column width="3/4">
        <Placeholder height={48} text="3/4" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space="xsmall">
      <Column width="1/5">
        <Placeholder height={48} text="1/5" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space="xsmall">
      <Column width="2/5">
        <Placeholder height={48} text="2/5" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space="xsmall">
      <Column width="3/5">
        <Placeholder height={48} text="3/5" />
      </Column>

      <Column>
        <Placeholder height={48} text="Fluid" />
      </Column>
    </Columns>

    <Columns space="xsmall">
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
  <Columns space="xsmall">
    <Column width={['1/2', '3/5']}>
      <Placeholder
        height={112}
        code={JSON.stringify(['1/2', '3/5'], null, 2)}
      />
    </Column>

    <Column>
      <Placeholder height={112} text="Fluid" />
    </Column>
  </Columns>
);

export const overflowText = () => (
  <Stack>
    <Columns space="xsmall" align="center">
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

    <Columns space="xsmall" align="center">
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
