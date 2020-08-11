import { Box, Link } from '@material-ui/core';
import { Meta } from '@storybook/react';
import { Placeholder } from '@superdispatch/ui-playroom/Placeholder';
import React from 'react';

import { Stack } from './Stack';

export default {
  title: 'Layout/Stack',
  component: Stack,
  decorators: [
    (Story) => (
      <Box maxWidth={240}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    componentSubtitle: (
      <>
        Heavily inspired by the{' '}
        <Link href="https://seek-oss.github.io/braid-design-system/components/Stack">
          Stack
        </Link>{' '}
        component from the{' '}
        <Link href="https://seek-oss.github.io/braid-design-system">
          BRAID Design System
        </Link>
        .
      </>
    ),
  },
} as Meta;

export const Basic = () => (
  <Stack>
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
  </Stack>
);

export const ResponsiveSpace = () => (
  <Stack space={{ xs: 1, sm: 2 }}>
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
  </Stack>
);

export const Alignment = () => (
  <Stack align="center">
    <Placeholder height={48} width={48} />
    <Placeholder height={48} width={64} />
    <Placeholder height={48} width={128} />
  </Stack>
);

export const ResponsiveAlignment = () => (
  <Stack align={{ xs: 'center', sm: 'left' }}>
    <Placeholder height={48} width={48} />
    <Placeholder height={48} width={64} />
    <Placeholder height={48} width={128} />
  </Stack>
);
