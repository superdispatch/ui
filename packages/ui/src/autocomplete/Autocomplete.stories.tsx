import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Meta } from '@storybook/react';
import { PropsLink } from '@superdispatch/ui-docs';
import React from 'react';

export default {
  title: 'Inputs/Autocomplete',
  decorators: [
    (Story) => (
      <Box maxWidth={240}>
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
    options={['John Doe', 'Richard Roe']}
    renderInput={(params) => <TextField {...params} label="Name" />}
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
    renderInput={(params) => (
      <TextField
        {...params}
        InputProps={{
          // We want to passthrough other `InputProps`
          ...params.InputProps,
          endAdornment: (
            <InputAdornment position="end">
              <CircularProgress color="inherit" size={20} />
            </InputAdornment>
          ),
        }}
      />
    )}
  />
);

export const disableClearable = () => (
  <Autocomplete
    disableClearable={true}
    options={['John Doe', 'Richard Roe']}
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
