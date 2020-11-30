import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Meta } from '@storybook/react';
import { PropsLink } from '@superdispatch/ui-docs';
import { Box } from '@superdispatch/ui-lab';

export default {
  title: 'Inputs/Autocomplete',
  decorators: [
    (Story) => (
      <Box maxWidth="240px">
        <Story />
      </Box>
    ),
  ],
  parameters: {
    componentSubtitle: (
      <PropsLink url="https://material-ui.com/api/autocomplete/#props" />
    ),
  },
} as Meta;

export const basic = () => (
  <Autocomplete
    options={['Option 1', 'Option 2']}
    renderInput={(params) => (
      <TextField {...params} label="Label" helperText="Helper text" />
    )}
  />
);

export const error = () => (
  <Autocomplete
    options={['Option 1', 'Option 2']}
    renderInput={(params) => (
      <TextField
        {...params}
        error={true}
        label="Label"
        helperText="Error text"
      />
    )}
  />
);

export const disabled = () => (
  <Autocomplete
    disabled={true}
    options={[]}
    renderInput={(params) => <TextField {...params} />}
  />
);

export const loading = () => (
  <Autocomplete
    loading={true}
    options={[]}
    renderInput={(params) => <TextField {...params} />}
  />
);

export const disableClearable = () => (
  <Autocomplete
    disableClearable={true}
    options={['Option 1', 'Option 2']}
    renderInput={(params) => <TextField {...params} />}
  />
);

export const forcePopupIcon = () => (
  <Autocomplete
    forcePopupIcon={true}
    options={['John Doe', 'Richard Roe']}
    renderInput={(params) => <TextField {...params} />}
  />
);
