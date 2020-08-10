import { Box, Link } from '@material-ui/core';
import {
  makePlayroomStory,
  PlayroomStoryWrapperProps,
} from '@superdispatch/ui-playroom/makePlayroomStory';
import { Placeholder } from '@superdispatch/ui-playroom/Placeholder';
import React from 'react';

import { Stack } from './Stack';

export default {
  title: 'Layout/Stack',
  component: Stack,
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
};

function Wrapper({ children }: PlayroomStoryWrapperProps) {
  return <Box maxWidth={240}>{children} </Box>;
}

export const Basic = makePlayroomStory(
  <Stack>
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
  </Stack>,
  { wrapper: Wrapper },
);

export const ResponsiveSpace = makePlayroomStory(
  <Stack space={{ xs: 1, sm: 2 }}>
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
  </Stack>,
  { wrapper: Wrapper },
);

export const Alignment = makePlayroomStory(
  <Stack align="center">
    <Placeholder height={48} width={48} />
    <Placeholder height={48} width={64} />
    <Placeholder height={48} width={128} />
  </Stack>,
  { wrapper: Wrapper },
);

export const ResponsiveAlignment = makePlayroomStory(
  <Stack align={{ xs: 'center', sm: 'left' }}>
    <Placeholder height={48} width={48} />
    <Placeholder height={48} width={64} />
    <Placeholder height={48} width={128} />
  </Stack>,
  { wrapper: Wrapper },
);
