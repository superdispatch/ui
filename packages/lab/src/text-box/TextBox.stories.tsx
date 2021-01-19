import { Meta } from '@storybook/react';
import { Column, Columns, Inline, Stack } from '@superdispatch/ui';

import { Box } from '../box/Box';
import { TextBox } from './TextBox';

export default { title: 'Lab/TextBox', component: TextBox } as Meta;

export const basic = () => (
  <TextBox>
    Hello{' '}
    <span role="img" aria-label="waving hand">
      👋
    </span>
  </TextBox>
);

export const alignment = () => (
  <Columns space={1}>
    <Column>
      <Box backgroundColor="Silver300" padding="xsmall" borderRadius="small">
        <TextBox align="right">Align Right</TextBox>
      </Box>
    </Column>

    <Column>
      <Box backgroundColor="Silver300" padding="xsmall" borderRadius="small">
        <TextBox align="center">Align Center</TextBox>
      </Box>
    </Column>

    <Column>
      <Box backgroundColor="Silver300" padding="xsmall" borderRadius="small">
        <TextBox align="left">Align Left</TextBox>
      </Box>
    </Column>
  </Columns>
);

export const responsiveAlignment = () => (
  <Box backgroundColor="Silver300" padding="xsmall" borderRadius="small">
    <TextBox align={['center', 'right']}>Text</TextBox>
  </Box>
);

export const colors = () => (
  <Box backgroundColor="Silver300" borderRadius="small" padding="xsmall">
    <Inline>
      <TextBox color="primary">Primary</TextBox>
      <TextBox color="secondary">Secondary</TextBox>
      <TextBox color="white">White</TextBox>
      <TextBox color="blue">Blue</TextBox>
      <TextBox color="green">Green</TextBox>
      <TextBox color="purple">Purple</TextBox>
      <TextBox color="red">Red</TextBox>
      <TextBox color="teal">Teal</TextBox>
      <TextBox color="yellow">Yellow</TextBox>
    </Inline>
  </Box>
);

export const variants = () => (
  <Stack>
    <TextBox variant="heading-1">h1. Heading</TextBox>
    <TextBox variant="heading-2">h2. Heading</TextBox>
    <TextBox variant="heading-3">h3. Heading</TextBox>
    <TextBox variant="heading-4">h4. Heading</TextBox>
    <TextBox variant="heading-5">h5. Heading</TextBox>
    <TextBox variant="heading-6">h6. Heading</TextBox>
    <TextBox variant="body">
      body. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
      neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
    </TextBox>
    <TextBox variant="body-block">
      body-block. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
      neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
    </TextBox>
    <TextBox variant="body-semibold">
      body-semibold. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
      consectetur, neque doloribus, cupiditate numquam dignissimos laborum
      fugiat deleniti?
    </TextBox>
    <TextBox variant="caption">
      caption. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
      neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
    </TextBox>
  </Stack>
);

export const noWrap = () => (
  <Box width="128px">
    <TextBox noWrap={true}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </TextBox>
  </Box>
);

export const wrapOverflow = () => (
  <Box width="128px">
    <TextBox wrapOverflow={true}>
      Most words are short and don‘t need to break. But
      Antidisestablishmentarianism is long.
    </TextBox>
  </Box>
);
