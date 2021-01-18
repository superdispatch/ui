import { Link } from '@material-ui/core';
import { Meta } from '@storybook/react';
import { Placeholder } from '@superdispatch/ui-docs';
import { Box } from '@superdispatch/ui-lab';

import { Stack } from './Stack';

export default {
  title: 'Lab/Stack',
  component: Stack,
  decorators: [
    (Story) => (
      <Box maxWidth="240px">
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

export const basic = () => (
  <Stack>
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
  </Stack>
);

export const responsiveSpace = () => (
  <Stack space={['small', 'xsmall', 'xxsmall']}>
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
  </Stack>
);

export const alignment = () => (
  <Stack align="center">
    <Placeholder height={48} width={48} />
    <Placeholder height={48} width={64} />
    <Placeholder height={48} width={128} />
  </Stack>
);

export const responsiveAlignment = () => (
  <Stack align={['center', 'left']}>
    <Placeholder height={48} width={48} />
    <Placeholder height={48} width={64} />
    <Placeholder height={48} width={128} />
  </Stack>
);

export const dynamicWidth = () => (
  <Stack>
    <Box padding="small">
      <Stack align={['left', 'right']}>
        <Box
          padding="small"
          borderWidth="small"
          borderRadius="small"
          borderColor="Silver400"
          backgroundColor="White"
        >
          Hey!
        </Box>

        <Box
          padding="small"
          borderWidth="small"
          borderRadius="small"
          borderColor="Silver400"
          backgroundColor="White"
        >
          Ho!
        </Box>

        <Box
          padding="small"
          borderWidth="small"
          borderRadius="small"
          borderColor="Silver400"
          backgroundColor="White"
        >
          Let’s Go!
        </Box>
      </Stack>
    </Box>
  </Stack>
);
