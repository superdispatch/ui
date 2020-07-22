import { Box, Card, CardContent, Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  makePlayroomStory,
  PlayroomStoryWrapperProps,
} from '@superdispatch/ui-playroom/makePlayroomStory';
import { Placeholder } from '@superdispatch/ui-playroom/Placeholder';
import React from 'react';

import { Stack } from './Stack';

export default {
  title: 'Layout/Stack',
  parameters: {
    info: {
      propTables: [Stack],
      text: (
        <Alert severity="info" icon={false}>
          Heavily inspired by the{' '}
          <Link
            color="primary"
            href="https://seek-oss.github.io/braid-design-system/components/Stack"
          >
            Stack
          </Link>{' '}
          component from the{' '}
          <Link href="https://seek-oss.github.io/braid-design-system">
            BRAID Design System
          </Link>
          .
        </Alert>
      ),
    },
  },
};

function Wrapper({ children }: PlayroomStoryWrapperProps) {
  return (
    <Box maxWidth={240}>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
}

export const Basic = makePlayroomStory(
  <Stack>
    {Array.from({ length: 3 }, (_, idx) => (
      <Placeholder key={idx} height={48} />
    ))}
  </Stack>,
  { wrapper: Wrapper },
);

export const ResponsiveSpace = makePlayroomStory(
  <Stack space={{ xs: 1, sm: 2 }}>
    {Array.from({ length: 3 }, (_, idx) => (
      <Placeholder key={idx} height={48} />
    ))}
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
