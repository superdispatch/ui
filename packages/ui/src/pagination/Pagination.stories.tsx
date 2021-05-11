import { Pagination } from '@material-ui/lab';
import { Meta } from '@storybook/react';
import { Stack } from '@superdispatch/ui';
import { PropsLink } from '@superdispatch/ui-docs';
import { Box } from '@superdispatch/ui-lab';

export default {
  title: 'Inputs/Pagination',
  component: Pagination,
  decorators: [
    (Story) => (
      <Box backgroundColor="White">
        <Story />
      </Box>
    ),
  ],
  parameters: {
    componentSubtitle: (
      <PropsLink url="https://material-ui.com/api/pagination/#props" />
    ),
  },
} as Meta;

export const basic = () => (
  <Stack space="medium">
    <Pagination count={154} page={5} siblingCount={3} />

    <Pagination count={154} page={13} siblingCount={3} />

    <Pagination count={154} page={147} siblingCount={3} />
  </Stack>
);

export const disabled = () => (
  <Pagination count={154} page={1} siblingCount={3} disabled={true} />
);
