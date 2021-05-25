import { Link } from '@material-ui/core';
import { Meta } from '@storybook/react';
import { Empty, Placeholder } from '@superdispatch/ui-docs';
import { Box } from '@superdispatch/ui-lab';
import { Inline } from './Inline';

export default {
  title: 'Layout/Inline',
  component: Inline,
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
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
  </Inline>
);

export const emptyElements = () => (
  <Inline>
    <Placeholder width={48} height={48} />
    <Empty />
    <Placeholder width={48} height={48} />
    <Empty />
    <Placeholder width={48} height={48} />
    <Empty />
    <Placeholder width={48} height={48} />
    <Empty />
    <Placeholder width={48} height={48} />
  </Inline>
);

export const responsiveSpace = () => (
  <Inline space={['xsmall', 'small']}>
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
  </Inline>
);

export const horizontalAlignment = () => (
  <Inline horizontalAlign="center">
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
  </Inline>
);

export const responsiveHorizontalAlignment = () => (
  <Inline horizontalAlign={['center', 'left']}>
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={48} />
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
  <Inline verticalAlign={['center', 'bottom']}>
    <Placeholder width={48} height={48} />
    <Placeholder width={48} height={64} />
    <Placeholder width={48} height={24} />
  </Inline>
);

export const noWrap = () => (
  <Box maxWidth="240px" overflow="hidden">
    <Inline noWrap={true}>
      <Placeholder width={48} height={48} />
      <Placeholder width={48} height={48} />
      <Placeholder width={48} height={48} />
      <Placeholder width={48} height={48} />
      <Placeholder width={48} height={48} />
    </Inline>
  </Box>
);
