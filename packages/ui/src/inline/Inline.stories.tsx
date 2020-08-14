import { Box, Link } from '@material-ui/core';
import { Meta } from '@storybook/react';
import { Placeholder } from '@superdispatch/ui-playroom/Placeholder';
import React from 'react';

import { Inline } from './Inline';

export default {
  title: 'Layout/Inline',
  component: Inline,
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
        <Link href="https://seek-oss.github.io/braid-design-system/components/Inline">
          Inline
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
  <Inline>
    {Array.from({ length: 10 }, (_, idx) => (
      <Placeholder key={idx} width={48} height={48} />
    ))}
  </Inline>
);

export const responsiveSpace = () => (
  <Inline space={{ xs: 1, sm: 2 }}>
    {Array.from({ length: 10 }, (_, idx) => (
      <Placeholder key={idx} width={48} height={48} />
    ))}
  </Inline>
);

export const horizontalAlignment = () => (
  <Inline horizontalAlign="center">
    {Array.from({ length: 10 }, (_, idx) => (
      <Placeholder key={idx} width={48} height={48} />
    ))}
  </Inline>
);

export const responsiveHorizontalAlignment = () => (
  <Inline horizontalAlign={{ xs: 'center', sm: 'left' }}>
    {Array.from({ length: 10 }, (_, idx) => (
      <Placeholder key={idx} width={48} height={48} />
    ))}
  </Inline>
);

export const verticalAlignment = () => (
  <Inline verticalAlign="center">
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={64} />
    <Placeholder width={48} height={24} />
  </Inline>
);

export const responsiveVerticalAlignment = () => (
  <Inline verticalAlign={{ xs: 'center', sm: 'bottom' }}>
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={64} />
    <Placeholder width={48} height={24} />
  </Inline>
);
