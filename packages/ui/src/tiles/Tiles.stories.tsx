import { Link } from '@material-ui/core';
import { Meta } from '@storybook/react';
import { Placeholder } from '@superdispatch/ui-docs';
import React from 'react';

import { Tiles } from './Tiles';

export default {
  title: 'Layout/Tiles',
  component: Tiles,
  parameters: {
    componentSubtitle: (
      <>
        Heavily inspired by the{' '}
        <Link href="https://seek-oss.github.io/braid-design-system/components/Tiles">
          Tiles
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
  <Tiles columns={3}>
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
  </Tiles>
);

export const responsiveColumns = () => (
  <Tiles columns={{ xs: 1, sm: 4 }}>
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
  </Tiles>
);

export const responsiveSpace = () => (
  <Tiles columns={3} space={{ xs: 4, sm: 2 }}>
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
    <Placeholder height={48} />
  </Tiles>
);
