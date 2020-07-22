import { Box, Card, CardContent, Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  makePlayroomStory,
  PlayroomStoryWrapperProps,
} from '@superdispatch/ui-playroom/makePlayroomStory';
import { Placeholder } from '@superdispatch/ui-playroom/Placeholder';
import React from 'react';

import { Inline } from './Inline';

export default {
  title: 'Layout/Inline',
  parameters: {
    info: {
      propTables: [Inline],
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
  <Inline>
    {Array.from({ length: 10 }, (_, idx) => (
      <Placeholder key={idx} width={48} height={48} />
    ))}
  </Inline>,
  { wrapper: Wrapper },
);

export const ResponsiveSpace = makePlayroomStory(
  <Inline space={{ xs: 1, sm: 2 }}>
    {Array.from({ length: 10 }, (_, idx) => (
      <Placeholder key={idx} width={48} height={48} />
    ))}
  </Inline>,
  { wrapper: Wrapper },
);

export const HorizontalAlignment = makePlayroomStory(
  <Inline horizontalAlign="center">
    {Array.from({ length: 10 }, (_, idx) => (
      <Placeholder key={idx} width={48} height={48} />
    ))}
  </Inline>,
  { wrapper: Wrapper },
);

export const ResponsiveHorizontalAlignment = makePlayroomStory(
  <Inline horizontalAlign={{ xs: 'center', sm: 'left' }}>
    {Array.from({ length: 10 }, (_, idx) => (
      <Placeholder key={idx} width={48} height={48} />
    ))}
  </Inline>,
  { wrapper: Wrapper },
);

export const VerticalAlignment = makePlayroomStory(
  <Inline verticalAlign="center">
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={64} />
    <Placeholder width={48} height={24} />
  </Inline>,
  { wrapper: Wrapper },
);

export const ResponsiveVerticalAlignment = makePlayroomStory(
  <Inline verticalAlign={{ xs: 'center', sm: 'bottom' }}>
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={64} />
    <Placeholder width={48} height={24} />
  </Inline>,
  { wrapper: Wrapper },
);
