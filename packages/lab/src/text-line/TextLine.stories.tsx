import { Meta } from '@storybook/react';
import { Column, Columns, Inline, Stack } from '@superdispatch/ui';
import React from 'react';

import { Box } from '..';
import { TextLine } from './TextLine';

export default {
  title: 'Lab/TextLine',
  component: TextLine,
  parameters: { loki: { skip: false } },
} as Meta;

export const basic = () => (
  <TextLine>
    Hello{' '}
    <span role="img" aria-label="waving hand">
      👋
    </span>
  </TextLine>
);

export const alignment = () => (
  <Columns space={1}>
    <Column>
      <Box backgroundColor="Silver300" padding="xsmall" borderRadius="small">
        <TextLine as="p" align="right">
          Align Right
        </TextLine>
      </Box>
    </Column>

    <Column>
      <Box backgroundColor="Silver300" padding="xsmall" borderRadius="small">
        <TextLine as="p" align="center">
          Align Center
        </TextLine>
      </Box>
    </Column>

    <Column>
      <Box backgroundColor="Silver300" padding="xsmall" borderRadius="small">
        <TextLine as="p" align="left">
          Align Left
        </TextLine>
      </Box>
    </Column>
  </Columns>
);

export const colors = () => (
  <Box backgroundColor="Silver300" borderRadius="small" padding="xsmall">
    <Inline>
      <TextLine color="primary">Primary</TextLine>
      <TextLine color="secondary">Secondary</TextLine>
      <TextLine color="white">White</TextLine>
      <TextLine color="blue">Blue</TextLine>
      <TextLine color="green">Green</TextLine>
      <TextLine color="purple">Purple</TextLine>
      <TextLine color="red">Red</TextLine>
      <TextLine color="teal">Teal</TextLine>
      <TextLine color="yellow">Yellow</TextLine>
    </Inline>
  </Box>
);

export const variants = () => (
  <Stack>
    <TextLine variant="heading-1">h1. Heading</TextLine>
    <TextLine variant="heading-2">h2. Heading</TextLine>
    <TextLine variant="heading-3">h3. Heading</TextLine>
    <TextLine variant="heading-4">h4. Heading</TextLine>
    <TextLine variant="heading-5">h5. Heading</TextLine>
    <TextLine variant="heading-6">h6. Heading</TextLine>
    <TextLine variant="body">
      body. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
      neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
    </TextLine>
    <TextLine variant="body-block">
      body-block. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
      neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
    </TextLine>
    <TextLine variant="body-semibold">
      body-semibold. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
      consectetur, neque doloribus, cupiditate numquam dignissimos laborum
      fugiat deleniti?
    </TextLine>
    <TextLine variant="caption">
      caption. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
      neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
    </TextLine>
  </Stack>
);

export const noWrap = () => (
  <Box width="128px">
    <TextLine noWrap={true}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </TextLine>
  </Box>
);
