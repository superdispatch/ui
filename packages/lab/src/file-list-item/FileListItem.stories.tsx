import { Meta } from '@storybook/react';
import { Stack } from '@superdispatch/ui';
import { Box } from '../box/Box';
import { FileListItem } from './FileListItem';

export default {
  title: 'Lab/FileListItem',
  component: FileListItem,
  decorators: [
    (Story) => (
      <Box maxWidth="200px">
        <Story />
      </Box>
    ),
  ],
} as Meta;

export const basic = () => (
  <Stack>
    <FileListItem name="Read this document.txt" />
    <FileListItem name="TST1208 Dispatcher Info.pdf" />
    <FileListItem
      name="attachment.jpg"
      url="https://picsum.photos/seed/picsum/1024/768"
    />
  </Stack>
);

export const status = () => (
  <Stack>
    <FileListItem name="TST1208 Dispatcher Info.pdf" status="idle" />
    <FileListItem name="TST1208 Dispatcher Info.pdf" status="loading" />
    <FileListItem name="TST1208 Dispatcher Info.pdf" status="success" />
    <FileListItem name="TST1208 Dispatcher Info.pdf" status="error" />
  </Stack>
);
